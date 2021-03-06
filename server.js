const dotenv = require('dotenv')
dotenv.config()
const MY_PORT = process.env.PORT
//const MY_APP_SECRET = process.env.APP_SECRET

// http object makes it possible to create a server
const http = require('http')
const app = require('./app')

const normalizePort = (val) => {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		return val
	}
	if (port >= 0) {
		return port
	}
	return false
}

const port = normalizePort(MY_PORT || '3000')
app.set('port', port)

const errorHandler = (error) => {
	if (error.syscall !== 'listen') {
		throw error
	}
	const address = server.address()
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges.')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use.')
			process.exit(1)
			break
		default:
			throw error
	}
}
//security --> for the prod, pass to https

//we pass our app to the server
const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
	const address = server.address()
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
	console.log('Listening on ' + bind)
})

server.listen(port)

///////////////////////
///////TESTS****TESTS
///////////////////////
/*
const server = http.createServer((req, res) =>
{
	res.end("test");
})
*/
/*
//test
app.get('/dotenv', (req, res) => {
	return res.send(MY_APP_SECRET)
})
*/
