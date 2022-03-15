const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const sauceCtrl = require("../controllers/sauces");

//
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
//router.post("/:id/like", auth, sauceCtrl.modifySauce);
//
module.exports = router;
