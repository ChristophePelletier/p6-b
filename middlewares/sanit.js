/*
function clearInputs(input) {
	let maj = input.replace(/\$/g, '_')
	return maj
}
*/

module.exports = (req, res, next) => {
	try {
		let sauceObject = JSON.parse(req.body.sauce)
		//console.log('sauceObject : ', sauceObject)
		//console.log('req.body.sauce : ', req.body.sauce)
		//console.log('sauceObject.name :', sauceObject.name)
		let majName = sauceObject.name.replace(/\$|\./g, '_')
		sauceObject.name = majName
		let majManufacturer = sauceObject.manufacturer.replace(/\$/g, '_')
		sauceObject.manufacturer = majManufacturer
		//console.log('sauceObject.name updated :', sauceObject.name)
		//console.log(req.body.sauce.name)
		req.body.sauce = JSON.stringify(sauceObject)
		console.log('req.body.sauce :', req.body.sauce)
		next()
	} catch {
		res.status(401).json({
			error: new Error('Message erreur'),
		})
	}
}
