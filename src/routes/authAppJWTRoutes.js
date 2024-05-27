const express = require("express");
const authAppController = require("../controller/authAppController");

const router = express.Router();
require("dotenv").config();

// AuthZ
router.post("/authz", authAppController.authz);


module.exports = router;
