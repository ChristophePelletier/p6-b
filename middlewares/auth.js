const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		// array [bearer token(crypted)] --> we get the token
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		const userId = decodedToken.userId;
		// prevent delete object from someone else
		//req.userId = userId;
		//
		// we add to the request object the userId --> for the delete function
		req.auth = { userId: userId };
		//
		if (req.body.userId && req.body.userId !== userId) {
			console.log("Middleware auth : erreur vérif token");
			throw "User ID non valable";
		} else {
			console.log("Middleware auth : token ok");
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Requête non authentifiée"),
		});
	}
};
