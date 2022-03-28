//
//ENVIRONMENT VARIABLES
//
const dotenv = require('dotenv')
dotenv.config()

//
//MODULES
//
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const app = express()
const mongooseExpressErrorHandler = require('mongoose-express-error-handler')
//our express app
//
//const apiLimiter = require('./middlewares/rate-limit.js')
// firt we choose to activate this security only for the login route
//const errorController = require('./controllers/errorController.js')

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauces')

// for images -> gets the path of the files --> for the middleware for the images
const path = require('path')
//
//CORS / CORS MUST BE PLACE BEFORE THE MIDDLEWAIRES
//
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	)
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	)
	next()
})

//
//DATA BASE
//
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log(' OK OK OK Connexion à MongoDB OK OK OK '))
	.catch(() => console.log('!!!!!! Échec Connexion à MongoDB !!!!!!'))

//
//MIDDLEWARES
//
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(express.json())
// --> must be placed before the JSON requests
// --> gets all the requests with content-type application/json
// --> request are available in body
// --> req.body

//
//app.use('/api', apiLimiter)

app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)
app.post('/test', function (req, res) {
	res.send('hello world')
})

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(mongooseExpressErrorHandler)
module.exports = app

///////////////////////
///////TESTS****TESTS
///////////////////////

/*
app.use('', (req, res, next) => {
	console.log(req.body)
	res.status(201).json({
		message: 'test',
	})
})
*/
//app.use(errorController.logErrors)
//app.use(errorController.respondNoRessourceFound)
//app.use(errorController.respondInternalError)

/*
app.use(function (req, res, next) {
	console.log('test')
	res.status(404)
	res.send('404: Page non trouvée')
})

app.use((req, res) => {
	res.status(404).redirect('/MyHomepage')
})
*/

/*
app.use((req, res) => {
	res.status(404).send("Sorry can't find that!")
})
*/
//app.use(mongoSanitize())
// export the app -> access from server.js / ...
