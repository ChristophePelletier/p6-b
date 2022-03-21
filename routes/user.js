const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

const ratelimit = require('../middlewares/rate-limit')
const Password = require('../middlewares/password')

//
router.post('/signup', Password, userCtrl.signup)
router.post('/login', ratelimit, userCtrl.login)

module.exports = router
