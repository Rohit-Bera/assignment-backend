const express = require("express");
const router = express.Router();

//import controllers
const{
   logIn,
   getAllUsers,
   signUp,
} = require("../controllers/user.controller");

//routes
router.post("/login",logIn);
router.post("/signUp",signUp);
router.get("/getUser",getAllUsers);

module.exports = router;