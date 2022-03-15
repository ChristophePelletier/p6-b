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
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

//must be placed before the JSON requests

//
//MIDDLEWARES
//
app.use(express.json());
// --> req.body
app.use("/api/auth", userRoutes);
//
// test upload
app.use("/api/upload", userRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));
//
module.exports = app;
