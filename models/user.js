const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// model name : User
// schema : userSchema
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	//ok impossible to  sign up with the same email more than one time
	password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
