let passwordValidator = require('password-validator')

// Create a schema
let schemaPassword = new passwordValidator()

// Add properties to it
schemaPassword
	.is()
	.min(3) // Minimum length 3
	.is()
	.max(50) // Maximum length 50
	//.has()
	//.uppercase() // Must have uppercase letters
	//.has()
	//.lowercase() // Must have lowercase letters
	//.has()
	//.digits(2) // Must have at least 2 digits
	//	.has()
	//.not()
	//.spaces() // Should not have spaces
	//	.is()
	.not()
	.oneOf(['Passw0rd', 'Password123', 'interdit']) // Blacklist these values

// Validate against a password string
//console.log(schemaPassword.validate('validPASS123'))
// => true
//console.log(schemaPassword.validate('invalidPASS'))
// => false

// Get a full list of rules which failed
console.log(schemaPassword.validate('test', { list: true }))
// => [ 'min', 'uppercase', 'digits' ]

module.exports = schemaPassword
