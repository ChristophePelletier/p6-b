const Sauce = require("../models/sauce");
const fs = require("fs");
const sauce = require("../models/sauce");

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
		//save returns a promise --> then ... catch
		.then(() => res.status(201).json({ message: "Sauce enregistrée" }))
		// !!response to the front necessary else the request would expire
		.catch((error) => res.status(400).json({ error: error }));
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
			// we split before and after "images" and get the second part
			//
			//second argument of unlink : the callback
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Sauce supprimée !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		});
	});
};

exports.updateSauce = (req, res, next) => {
	//
	Sauce.findOne({ _id: req.params.id }).then((sauce) => {
		if (req.file && sauce.userId == req.auth.userId) {
			const filename = sauce.imageUrl.split("/images")[1];
			fs.unlink(`images/${filename}`, () => {
				//
				Sauce.updateOne(
					//object of comparaison
					{ _id: req.params.id },
					//new object
					{
						...JSON.parse(req.body.sauce),
						imageUrl: `${req.protocol}://${req.get("host")}/images/${
							req.file.filename
						}`,
					}
				)
					.then(() => res.status(200).json({ message: "Sauce modifiée" }))
					.catch((error) => res.status(400).json({ error }));
				//
			});
		} else if (!req.file && sauce.userId == req.auth.userId) {
			//
			Sauce.updateOne(
				//object of comparaison
				{ _id: req.params.id },
				//new object
				{ ...req.body }
			)
				.then(() => res.status(200).json({ message: "Sauce modifiée" }))
				.catch((error) => res.status(400).json({ error }));
		}
	});
	//
};

/*
likeSauce
*/
exports.likeSauce = (req, res, next) => {
	Sauce.findOne({
		_id: req.params.id,
		//req.params refers to items with a ':' in the URL
	})
		.then((sauce) => {
			sauce.usersLiked.push(req.body.userId);
			console
				.log("req.body :", req.body)
				.res.status(200)
				.json({ message: "like test" });
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};
