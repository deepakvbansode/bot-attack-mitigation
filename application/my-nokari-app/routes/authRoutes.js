const express = require("express");
const path = require("path");
const { login, logout } = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.cookies && req.cookies.auth) {
    return res.redirect("/dashboard");
  }
  res.status(200).sendFile(path.join(__dirname, "../views/login.html"));
});

router.post("/login", login);

router.get("/dashboard", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../views/dashboard.html"));
});

router.get("/logout", logout);

module.exports = router;
