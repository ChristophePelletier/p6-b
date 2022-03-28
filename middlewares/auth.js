const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
module.exports = (req, res, next) => {
	try {
		//we get the authorization in the req.headers and get the token
		// array [bearer token(crypted)] --> we get the token
		const token = req.headers.authorization.split(' ')[1]
		const decodedToken = jwt.verify(token, process.env.RTS)
		//
		//jwt.verify(token, process.env.RTS)
		//if error --> catch
		// OK : we pass it in env variable
		const userId = decodedToken.userId
		console.log('decodedToken.userId', decodedToken.userId)
		console.log('userId', userId)
		// prevent delete object from someone else
		//req.userId = userId;
		// we add to the request object the userId --> for the delete function
		req.auth = { userId }
		//req.userId=userId;
		//req.auth = { userId: userId }
		if (req.body.userId && req.body.userId !== userId) {
			throw 'User ID not valid'
		} else {
			console.log('Middleware auth : token ok')
			next()
		}
	} catch {
		//specifications :
		//"Si l'userId ne correspond pas, renvoyer « 403: unauthorized request. »"
		const error = new Error('unauthorized request')
		res.status(403).json({
			error: error.message,
		})
	}
}
