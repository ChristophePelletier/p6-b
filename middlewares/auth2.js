const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		const decodedToken = jwt.verify(token, process.env.RTS)
		const userId = decodedToken.userId
		req.auth = { userId }
		if (sauce.userId !== req.auth.userId) {
			console.log('Middleware auth : erreur vérif token')
			console.log('req.body.userId', req.body.userId)
			throw 'User ID not valid'
		} else {
			console.log('Middleware auth : token ok')
			next()
		}
	} catch {
		res.status(401).json({
			error: new Error('Invalid request!'),
		})
	}
}
