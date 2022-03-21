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
//our express app
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauces')
//for the test only
// for images -> gets the path of the files --> for the middleware for the images
const path = require('path')
const errorHandler = require('./middlewares/errorhandler.js')
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
app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)
//
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(errorHandler())
// export the app -> access from server.js / ...
module.exports = app
