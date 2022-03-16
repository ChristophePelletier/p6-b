const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		const userId = decodedToken.userId;
		// prevent delete object from someone else
		//req.userId = userId;
		req.auth = { userId: userId };
		if (req.body.userId && req.body.userId !== userId) {
			console.log("Middleware auth : erreur vérif token");
			throw "Invalid user ID";
		} else {
			console.log("Middleware auth : token ok");
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!"),
		});
	}
};
