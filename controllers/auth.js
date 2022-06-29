const express = require(`express`);
const register = require("./register");
const login = require("./login");
const search = require("./search")
const statistics =  require("./statistics");
const analyse = require("./analyse");
const add = require("./scraping/add");
const load = require("./load");
const view = require("./view");
const remove = require("./remove");
const getUserRole = require('./getUserRole');


// linking the middlewear
const router  = express.Router();


router.post("/register" , register);
router.post("/login" , login);
router.post("/search" , search);
router.post("/statistics" , statistics);
router.post("/analyse" , analyse);
router.post("/add" , add);
router.post("/load" , load);
router.post("/view" , view);
router.post("/remove" , remove);
router.post("/getUserRole" , getUserRole);

module.exports = router;