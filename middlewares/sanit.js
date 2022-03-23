module.exports = (req, res, next) => {
	try {
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
		next()
	} catch {
		res.status(401).json({
			error: new Error('Message erreur'),
		})
	}
}
/*
module.exports = (req, res, next) => {
	try {
		let sauceObject = JSON.parse(req.body.sauce)
		console.log('sauceObject.name :', sauceObject.name)
		//
		if (sauceObject.name == 'test') {
			console.log('Le password ne répond pas aux critères de sécurité')
			throw 'Le password ne répond pas aux critères de sécurité'
		} else {
			console.log('ok pass assez complexe')
			next()
		}
	} catch {
		res.status(401).json({
			error: new Error('Message erreur'),
		})
	}
}
*/
