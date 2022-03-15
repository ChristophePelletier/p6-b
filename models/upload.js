const mongoose = require("mongoose");

// model name : Upload
// schema : uploadSchema
const uploadSchema = mongoose.Schema({
	imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Upload", uploadSchema);
