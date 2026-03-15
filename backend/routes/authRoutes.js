const express = require("express");
const auth = require("../controllers/authController");

const router = express.Router;

router.post("/signup", auth.signup);
router.login("/login", auth.login);

module.exports = router;