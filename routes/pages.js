const express = require(`express`);
const loggedIn = require(`../controllers/loggedIn`);
const logout = require("../controllers/logout");
const authRole = require(`../controllers/roleAuth`);
const router = express.Router();

router.use(express.static(__dirname + "/public"));

router.get("/", loggedIn, (req, res) => {
  if (req.user) {
    res.render("index", { status: "loggedIN", user: req.user });
  } else {
    res.render("index", { status: "NoLog", user: "NO USER" });
  }
});

router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "./public/html" });
});

router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./public/html" });
});

router.get("/logout", logout, (req, res) => {
  // bye bye :(
});

router.get("/analyse", loggedIn, authRole("teacher"), (req, res) => {
  if (req.user) {
    res.render("analyse", { user: req.user });
  } else {
    res.sendFile("error_login.html", { root: "./public/html" });
  }
});

router.get("/search", loggedIn, authRole("student"), (req, res) => {
  if (req.user) {
    res.render("search", { user: req.user });
  } else {
    res.sendFile("error_login.html", { root: "./public/html" });
  }
});

router.get("/profile", (req, res) => {
  res.sendFile("coming_soon.html", { root: "./public/html" });
});

router.get("/statistics", loggedIn, (req, res) => {
  if (req.user) {
    res.render("statistics", { user: req.user });
  } else {
    res.sendFile("error_login.html", { root: "./public/html" });
  }
});

module.exports = router;
