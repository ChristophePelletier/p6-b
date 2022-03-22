const express = require('express')
const router = express.Router()

//
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')
const sauceCtrl = require('../controllers/sauces')
const test = require('../middlewares/test')
//const errorHandler = require("../middlewares/errorhandler.js");
// !! auth before multer to prevent adding images from unidentified users
router.post('/', auth, multer, test, sauceCtrl.createSauce)
router.get('/', auth, sauceCtrl.getAllSauces)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.put('/:id', auth, multer, sauceCtrl.updateSauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.post('/:id/like', auth, sauceCtrl.likeSauce)
//
module.exports = router
