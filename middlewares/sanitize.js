let sanitize = require('mongo-sanitize')

let clean = sanitize(req.body)

module.exports = clean
