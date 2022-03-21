function errorHandler() {
	return function (err, req, res, next) {
		console.log('errorHandler')
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/html' })
			res.end(
				'<h1>Erreur dans la requête' +
					req.url +
					'</h1>' +
					'<pre>' +
					err.stack +
					'</pre>'
			)
		} else next()
	}
}

module.exports = errorHandler

// Sarrion p.245
