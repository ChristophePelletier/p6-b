const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
/*
mongoose-unique-validator
https://www.npmjs.com/package/mongoose-unique-validator
mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema
This makes error handling much easier, since you will get a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB
*/

// model name : User
// schema : userSchema

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
			},
			message: (props) => `${props.value} pas un email correct`,
		},
		unique: true,
	},
	//ok impossible to  sign up with the same email more than one time
	password: { type: String, required: true },
	// the password will be a hash --> the hash is a string too
});

// we apply the validator to the Schema before making the model
// with the method plugin --> argument : uniqueValidator
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
