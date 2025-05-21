const express = require("express");
const router = express.Router();
const { register, getUser } = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.get("getDetails", authMiddleware, getUser);
module.exports = router;
