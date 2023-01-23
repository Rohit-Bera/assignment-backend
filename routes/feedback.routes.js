const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminauth = require("../middlewares/adminauth");
const clientauth = require("../middlewares/clientauth");
const {postuserFeedback,
    getalluserFeedback,
    deleteuserFeedback,
    postClientFeedback,
    getallClientFeedback,
    deleteClientFeedback} = require("../controllers/feedback.controller");

//user routes
router.post("/postUserFeedback/:id",auth,postuserFeedback);
router.get("/getUserFeedback",adminauth,getalluserFeedback);
router.delete("/deleteUserFeedback/:id",adminauth,deleteuserFeedback);

//client routes
router.post("/postClientFeedback/:id",clientauth,postClientFeedback);
router.get("/getClientFeedback",adminauth,getallClientFeedback);
router.delete("/deleteClientFeedback/:id",adminauth,deleteClientFeedback);


module.exports = router;
