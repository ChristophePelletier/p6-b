const Sauce = require('../models/sauce')

module.exports = (req, res, next) => {
	//
	Sauce.findOne({ _id: req.params.id }).then((sauce) => {
		if (req.file && sauce.userId == req.auth.userId) {
			let sauceObject = JSON.parse(req.body.sauce)
			console.log('sauceObject : ', sauceObject)
			console.log('req.body.sauce : ', req.body.sauce)
			console.log('sauceObject.name :', sauceObject.name)
			let maj = sauceObject.name.replace(/\$/g, '_')
			sauceObject.name = maj
			console.log('sauceObject.name updated :', sauceObject.name)
			console.log(req.body.sauce.name)
			req.body.sauce = JSON.stringify(sauceObject)
			console.log(req.body.sauce)
			//
			next()
		} else if (!req.file && sauce.userId == req.auth.userId) {
			console.log(req.body)
			let maj = req.body.name.replace(/\$/g, '_')
			req.body.name = maj
			console.log(req.body.name)
			//req.body.sauce = JSON.stringify(sauceObject)
			next()
			//
		}
	})
	//
}
