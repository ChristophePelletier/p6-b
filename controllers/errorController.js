const httpStatus = require('http-status-code')

exports.logErrors = (error, req, res, next) => {
	console.error(error.stack)
	next(error)
}

exports.respondNoRessourceFound = (req, res) => {
	let errorCode = httpStatus.NOT_FOUND
	res.status(errorCode)
	res.send(`${errorCode} | la page n'existe pas`)
}

exports.respondInternalError = (error, req, res, next) => {
	let errorCode = httpStatus.INTERNAL_SERVER_ERROR
	console.log(`ERROR occured : ${error.stack}`)
	res.status(errorCode)
	res.send(`${errorCode} | crash`)
}
