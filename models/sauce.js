const mongoose = require("mongoose");

// model name : Sauce
// schema : sauceSchema
const sauceSchema = mongoose.Schema({
	imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Sauce", sauceSchema);
