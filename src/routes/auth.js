const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/authController");

//* /api/auth/register
router.post("/register", register);

//* /api/auth/register/:id
router.post("/login", login);

module.exports = router;
