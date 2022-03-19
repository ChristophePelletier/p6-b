const mongoose = require("mongoose");
//

//
// model name : Sauce
// schema : sauceSchema
const sauceSchema = mongoose.Schema({
	userId: { type: String, required: true },
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 25,
		//match: [/MaRegex/, "ma regex"],
	},
	manufacturer: {
		type: String,
		// if the validation is violated, it will throw
		/*
		validate: {
			validator: function (v) {
				return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
			},
			message: (props) => `${props.value} pas un email correct`,
			
		},*/
		required: [true, "manufacturer requis"],
	},
	description: {
		type: String,
		required: [true, "description requise"],
	},
	mainPepper: {
		type: String,
		required: [true, "mainPepper requis"],
	},
	imageUrl: {
		type: String,
		required: [true, "image requise"],
	},
	heat: {
		type: Number,
		required: [true, "heat requise"],
	},
	likes: {
		type: Number,
		default: 0,
	},
	dislikes: {
		type: Number,
		default: 0,
	},
	usersLiked: {
		type: Array,
		default: [],
	},
	usersDisliked: {
		type: Array,
		default: [],
	},
});
module.exports = mongoose.model("Sauce", sauceSchema);
