const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//
const User = require("../models/user");

//SIGNUP
// POST : /api/auth/signup
// request email password
// response message

exports.signup = (req, res, next) => {
	console.log(" signup req : ", req.body);
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email: req.body.email,
				password: hash,
			});
			user
				.save()
				.then(() => res.status(201).json({ message: "Utilisateur créé" }))
				.catch((error) => res.status(400).json({ error }));
		})

		.catch((error) => res.status(500).json({ error }));
};

// http://localhost:3000/api/auth/signup
// test postman ok --> JSON
// {"email":"bbb@aaa.fr","password":"bbb"}

//LOGIN
// POST : /api/auth/login
//request email password
// response userId
exports.login = (req, res, next) => {
	console.log(" login req : ", req.body);
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						console.log("erreur");
						return res
							.status(401)
							.json({ error: "Le mot de passe est incorrect" });
					}
					res.status(200).json({
						userId: user._id,
						// sign function : --> 3 arguments / 1: datas to endode in the token (payload) / 2 : secret key / 3 : time
						token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
							expiresIn: "1h",
						}),
						//OK Request headers : Bearer user._id crypted
					});
				})
				.catch((error) => res.status(500).json({ error }));
			// for connexion problem
		})
		.catch((error) => res.status(500).json({ error }));
};

// http://localhost:3000/api/auth/login
// test postman ok --> JSON
// {"email":"test@test.fr","password":"test"}
