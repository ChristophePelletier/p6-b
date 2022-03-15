const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	//
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		usersDisliked: [],
		usersLiked: [],
		likes: 0,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce enregistrée" }))
		.catch((error) => res.status(400).json({ error }));
};
