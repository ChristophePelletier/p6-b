const Sauce = require('../models/sauce')
const fs = require('fs')

/**
createSauce
*/
exports.createSauce = (req, res, next) => {
	// get the object
	const sauceObject = JSON.parse(req.body.sauce)
	delete sauceObject._id
	const sauce = new Sauce({
		...sauceObject,
		// image URL http or https + host of the server + /images/ + filename
		imageUrl: `${req.protocol}://${req.get('host')}/images/${
			req.file.filename
		}`,
	})
	sauce
		.save()
		//save returns a promise --> then ... catch
		.then(() => res.status(201).json({ message: 'Sauce enregistrée' }))
		// !!response to the front necessary else the request would expire
		.catch((error) => res.status(400).json({ error: error }))
}

/**
getAllSauces
*/
exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => {
			res.status(200).json(sauces)
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			})
		})
}

/**
getOneSauce
*/
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({
		_id: req.params.id,
	})
		.then((sauce) => {
			res.status(200).json(sauce)
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			})
		})
}

/**
deleteSauce
*/
exports.deleteSauce = (req, res, next) => {
	// ! id de la sauce but not id of the user --> security to adapt
	Sauce.findOne({ _id: req.params.id }).then((sauce) => {
		if (!sauce) {
			res.status(404).json({
				error: new Error('No such Thing!'),
			})
		}
		// ! only the user who sent the sauce can delete the sauce
		if (sauce.userId !== req.auth.userId) {
			res.status(400).json({
				error: new Error('Unauthorized request!'),
			})
		}
		//

		//
		Sauce.findOne({ _id: req.params.id }).then((sauce) => {
			const filename = sauce.imageUrl.split('/images/')[1]
			// we split before and after "images" and get the second part
			//
			//fs.unlink(path, callback) ---->  callback function(error)
			//err == null if the file has correctly been deleted
			//second argument of unlink : the callback
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
					.catch((error) => res.status(400).json({ error }))
			})
		})
	})
}
/**
 updateSauce
 */
exports.updateSauce = (req, res, next) => {
	//
	Sauce.findOne({ _id: req.params.id }).then((sauce) => {
		if (req.file && sauce.userId == req.auth.userId) {
			const filename = sauce.imageUrl.split('/images')[1]
			//we choose to first delete the former file in the image directory
			fs.unlink(`images/${filename}`, () => {
				//
				Sauce.updateOne(
					//object of comparaison
					{ _id: req.params.id },
					//new object
					{
						...JSON.parse(req.body.sauce),
						imageUrl: `${req.protocol}://${req.get('host')}/images/${
							req.file.filename
						}`,
					}
				)
					.then(() => res.status(200).json({ message: 'Sauce modifiée' }))
					.catch((error) => res.status(400).json({ error }))
				//
			})
		} else if (!req.file && sauce.userId == req.auth.userId) {
			//
			Sauce.updateOne(
				//object of comparaison
				{ _id: req.params.id },
				//new object
				{ ...req.body }
			)
				.then(() => res.status(200).json({ message: 'Sauce modifiée' }))
				.catch((error) => res.status(400).json({ error }))
		}
	})
	//
}

/**
likeSauce
*/
exports.likeSauce = (req, res, next) => {
	Sauce.findOne({
		_id: req.params.id,
	})
		.then((sauce) => {
			//usersLiked
			if (
				req.body.like == 1 &&
				sauce.usersLiked.includes(req.body.userId) == false
				//we prevent a user to like the sauce more than one
				//by checking in the usersLiked array
				//that the user is not in it
			) {
				console.log('req.body :', req.body)
				//push in the usersLiked array the Id of the user
				sauce.usersLiked.push(req.body.userId)
				//the number of likes is the length of the array
				sauce.likes = sauce.usersLiked.length
				//
				if (sauce.usersDisliked.includes(req.body.userId) == true) {
					let indexToDelete = sauce.usersDisliked.indexOf(req.body.userId)
					sauce.usersDisliked.splice(indexToDelete, 1)
					sauce.dislikes = sauce.usersDisliked.length
				} else {
					console.log('pas de dislike avant un like')
				}
				//
				sauce
					.save()
					//save returns a promise --> then ... catch
					.then(() => res.status(201).json({ message: 'like ok' }))
					// !!response to the front necessary else the request would expire
					.catch((error) => res.status(400).json({ error }))
			}
			//
			//usersDisliked
			//same logic as usersLiked
			else if (
				req.body.like == -1 &&
				sauce.usersDisliked.includes(req.body.userId) == false
			) {
				console.log('req.body :', req.body)
				sauce.usersDisliked.push(req.body.userId)
				sauce.dislikes = sauce.usersDisliked.length
				//
				if (sauce.usersLiked.includes(req.body.userId) == true) {
					let indexToDelete = sauce.usersLiked.indexOf(req.body.userId)
					sauce.usersLiked.splice(indexToDelete, 1)
					sauce.likes = sauce.usersLiked.length
				} else {
					console.log('pas de like avant un dislike')
				}
				//
				sauce
					.save()
					//save returns a promise --> then ... catch
					.then(() => res.status(201).json({ message: 'dislike ok' }))
					// !!response to the front necessary else the request would expire
					.catch((error) => res.status(400).json({ error: error }))
			}
			//cancel like or dislike
			else if (req.body.like == 0) {
				//case 1 : for a user who disliked the sauce
				if (sauce.usersDisliked.includes(req.body.userId) == true) {
					console.log('0 Dislike suppr :', req.body)
					let indexToDelete = sauce.usersDisliked.indexOf(req.body.userId)
					sauce.usersDisliked.splice(indexToDelete, 1)
					sauce.dislikes = sauce.usersDisliked.length
				}
				//case 2 : for a user who liked the sauce
				else if (sauce.usersLiked.includes(req.body.userId) == true) {
					console.log('0 Like suppr :', req.body)
					let indexToDelete = sauce.usersLiked.indexOf(req.body.userId)
					sauce.usersLiked.splice(indexToDelete, 1)
					sauce.likes = sauce.usersLiked.length
				} else {
					console.log('?', req.body)
					res.status(400).json({ error: 'like / dislike impossible' })
				}
				sauce
					.save()
					//save returns a promise --> then ... catch
					.then(() =>
						res.status(201).json({ message: 'cancel like dislike ok' })
					)
					// !!response to the front necessary else the request would expire
					.catch((error) => res.status(400).json({ error: error }))
			} else {
				console.log('erreur', req.body)
				res.status(400).json({ error: 'like / dislike impossible' })
			}
		})

		.catch((error) => {
			res.status(404).json({
				error: error,
			})
		})
}
