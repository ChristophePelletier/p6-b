const express = require("express");
const router = express.Router();

const uploadCtrl = require("../controllers/upload");

router.post("/upload", uploadCtrl.uploadImage);

module.exports = router;
