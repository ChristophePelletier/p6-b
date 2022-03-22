const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

const rateLimit = require('../middlewares/rate-limit')
const password = require('../middlewares/password')

//
router.post('/signup', password, userCtrl.signup)
router.post('/login', rateLimit, userCtrl.login)

module.exports = router
