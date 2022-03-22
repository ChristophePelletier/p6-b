//const Sauce = require('../models/sauce')
const fs = require('fs')
//
module.exports = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce)
	//const image = JSON.parse(req.body.image)
	//const filename = sauceObject.imageUrl.split('/images/')[1]
	console.log('sauceObject.imageUrl :', sauceObject.imageUrl)
	console.log('sauceObject.name :', sauceObject.name)
	console.log('sauceObject :', sauceObject)
	//console.log('image :', image)
	try {
		if (sauceObject.name == 'problem') {
			//const filename = image.imageUrl.split('/images/')[1]
			fs.unlink(`images/${filename}`, function (err) {
				if (err) console.log(err)
				else console.log('fichiersuppr')
			})
			console.log('problème')
			throw 'Problème'
		} else {
			console.log('okkkkkkkkk')
			next()
		}
	} catch {
		res.status(401).json({
			error: new Error('Requête non authentifiée'),
		})
	}
}
