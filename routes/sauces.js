const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");

router.post("/upload", saucesCtrl.upload);

module.exports = router;
