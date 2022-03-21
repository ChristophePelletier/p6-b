const mongoose = require('mongoose')
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
		maxlength: 100,
		match: [/[a-zA-Z]/, 'Problème dans la saisie du nom de la sauce'],
	},
	manufacturer: {
		type: String,
		// if the validation is violated, it will throw
		validate: {
			validator: function (value) {
				return /[A-Z]/.test(value)
			},
			message: (props) => `${props.value} : nom de manufacturer incorrect`,
		},
		required: [true, 'manufacturer requis'],
	},
	description: {
		type: String,
		required: [true, 'description requise'],
	},
	mainPepper: {
		type: String,
		required: [true, 'mainPepper requis'],
	},
	imageUrl: {
		type: String,
		required: [true, 'image requise'],
	},
	heat: {
		type: Number,
		required: [true, 'heat requise'],
		min: [1, 'Min : {VALUE}'],
		max: [10, 'Max : {VALUE}'],
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
})
module.exports = mongoose.model('Sauce', sauceSchema)
