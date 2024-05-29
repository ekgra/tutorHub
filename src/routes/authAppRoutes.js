const express = require("express");
const router = express.Router();
const authAppController = require("../controller/authAppController");

// AuthN and AuthZ
router.post("/auth", authAppController.auth);


module.exports = router;
