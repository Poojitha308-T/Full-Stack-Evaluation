const express = require("express");
const router = express.Router();
const account = require("../controllers/accountController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/balance", verifyToken, account.getBalance);
router.get("/users", verifyToken, account.getUsers);
router.get("/statement", verifyToken, account.getStatement);
router.post("/transfer", verifyToken, account.transfer);

module.exports = router;