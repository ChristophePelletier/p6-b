//
//ENVIRONMENT VARIABLES
//
const dotenv = require("dotenv");
dotenv.config();

//
//MODULES
//
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauces");
//for the test only
// for images
const path = require("path");
//
//CORS / CORS MUST BE PLACE BEFORE THE MIDDLEWAIRES
//
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

//
//DATA BASE
//
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("OK OK OK Connexion à MongoDB OK OK OK"))
	.catch(() => console.log("!!!!!!Échec Connexion à MongoDB!!!!!!"));

//
//MIDDLEWARES
//
app.use(express.json());
// --> must be placed before the JSON requests
// --> req.body

//
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
