let sanitize = require('express-mongo-sanitize')

let clean = sanitize(req.body)

module.exports = clean
