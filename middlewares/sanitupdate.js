const Sauce = require('../models/sauce')

module.exports = (req, res, next) => {
	//
	Sauce.findOne({ _id: req.params.id }).then((sauce) => {
		if (req.file && sauce.userId == req.auth.userId) {
			let sauceObject = JSON.parse(req.body.sauce)
			console.log('sauceObject : ', sauceObject)
			console.log('req.body.sauce : ', req.body.sauce)
			console.log('sauceObject.name :', sauceObject.name)
			let majName = sauceObject.name.replace(/\$|\.|#|"|'|\?|!/g, '_')
			sauceObject.name = majName
			console.log('sauceObject.name updated :', sauceObject.name)
			console.log(req.body.sauce.name)
			//
			let majManufacturer = sauceObject.manufacturer.replace(
				/\$|\.|#|"|'|\?|!/g,
				'_'
			)
			sauceObject.manufacturer = majManufacturer
			//
			let majDescription = sauceObject.description.replace(
				/\$|\.|#|"|'|\?|!/g,
				'_'
			)
			sauceObject.description = majDescription
			//
			let majMainPepper = sauceObject.mainPepper.replace(
				/\$|\.|#|"|'|\?|!/g,
				'_'
			)
			sauceObject.mainPepper = majMainPepper

			//
			req.body.sauce = JSON.stringify(sauceObject)
			console.log(req.body.sauce)
			//
			next()
		} else if (!req.file && sauce.userId == req.auth.userId) {
			console.log(req.body)
			let majName = req.body.name.replace(/\$|\.|#|"|'|\?|!/g, '_')
			req.body.name = majName
			console.log(req.body.name)
			//
			let majDescription = req.body.description.replace(
				/\$|\.|#|"|'|\?|!/g,
				'_'
			)
			req.body.description = majDescription
			//
			let majManufacturer = req.body.manufacturer.replace(
				/\$|\.|#|"|'|\?|!/g,
				'_'
			)
			req.body.manufacturer = majManufacturer
			//
			let majMainPepper = req.body.mainPepper.replace(/\$|\.|#|"|'|\?|!/g, '_')
			req.body.mainPepper = majMainPepper
			//req.body.sauce = JSON.stringify(sauceObject)
			next()
			//
		} else {
			res.send({ errorCode: '403: unauthorized request' })
		}
	})
	//
}
