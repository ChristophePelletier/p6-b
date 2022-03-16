const Sauce = require("../models/sauce");
const fs = require("fs");

/*
createSauce
*/
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	// we must get  the object
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		// image URL http or https + host of the server + /images/ + filename
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce enregistrée" }))
		.catch((error) => res.status(400).json({ error }));
};

/*
getAllSauces
*/
exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => {
			res.status(200).json(sauces);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

/*
getOneSauce
*/
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({
		_id: req.params.id,
	})
		.then((sauce) => {
			res.status(200).json(sauce);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

/*
updateSauce
2 possibilities
the user uploads a new image
-> if new image -> parse req.body
-> if no new image -> req.body
*/

exports.updateSauce = (req, res, next) => {
	//we check if there is a new image or not
	// ? ternary operator --> the update with a new req.file -> ... / the update without new req.file -> ...
	const sauceObject = req.file
		? // new req.file :
		  {
				// if req.file == true -> we get the request and parse it
				...JSON.parse(req.body.sauce),
				// we define the url of the new image :
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: // else no new req.file : we just copy req.body
		  { ...req.body };
	Sauce.updateOne(
		//object of comparaison
		{ _id: req.params.id },
		//new object
		{ ...sauceObject, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: "Sauce modifiée" }))
		.catch((error) => res.status(400).json({ error }));
};

/*
deleteSauce
*/
exports.deleteSauce = (req, res, next) => {
	// ! id de la sauce but not id of the user --> security to adapt
	Sauce.findOne({ _id: req.params.id }).then((sauce) => {
		if (!sauce) {
			res.status(404).json({
				error: new Error("No such Thing!"),
			});
		}
		// ! only the user who sent the sauce can delete the sauce
		if (sauce.userId !== req.auth.userId) {
			res.status(400).json({
				error: new Error("Unauthorized request!"),
			});
		}
		//

		//
		Sauce.findOne({ _id: req.params.id }).then((sauce) => {
			const filename = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Sauce supprimée !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		});
	});
};

/*
exports.updateSauce = (req, res, next) => {
	const sauceObject=0;
		if (req.file)
		{
			sauceObject =
	...JSON.parse(req.body.sauce),
	imageUrl: `${req.protocol}://${req.get("host")}/images/${
		req.file.filename
	}`,
		}
		else
		{
			{sauceObject=...req.body };
		}
	Sauce.updateOne(
		{ _id: req.params.id },
		{ ...sauceObject, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: "Sauce modifiée" }))
		.catch((error) => res.status(400).json({ error }));
};
*/
