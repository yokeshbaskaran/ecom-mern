const express = require("express");
const router = express.Router();

const { login, logout, profile } = require("../controllers/adminController");

router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", profile);

module.exports = router;
