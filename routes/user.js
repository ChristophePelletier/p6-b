const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

const ratelimit = require('../middlewares/rate-limit')

//
router.post('/signup', userCtrl.signup)
router.post('/login', ratelimit, userCtrl.login)

module.exports = router
