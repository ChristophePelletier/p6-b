const Password = require('../models/password')

module.exports = (req, res, next) => {
	try {
		let pass = req.body.password
		//
		if (Password.validate(pass) == false) {
			console.log('Le password ne répond pas aux critères de sécurité')
			//throw 'Le password ne répond pas aux critères de sécurité'
			res.status(400).json({
				error: 'Le password ne répond pas aux critères de sécurité',
			})
		} else {
			console.log('ok pass assez complexe')
			next()
		}
	} catch {
		res.status(401).json({
			error: new Error('Problème création mot de passe'),
		})
	}
}
