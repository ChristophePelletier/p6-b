const Password = require('../models/password')

module.exports = (req, res, next) => {
	try {
		let pass = req.body.password
		//
		if (Password.validate(pass) == false) {
			console.log('pb')
			throw 'pb'
		} else {
			console.log('ok pass')
			next()
		}
	} catch {
		res.status(401).json({
			error: new Error('Message erreur'),
		})
	}
}
