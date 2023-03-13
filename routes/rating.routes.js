const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminauth = require("../middlewares/adminauth");
const clientauth = require("../middlewares/clientauth");

const {postRating,getRating,deleteRating} = require("../controllers/rating.controller");

//rating
router.post("/postrating/:id",clientauth,postRating);
router.get("/getrating",adminauth,getRating);
router.delete("/deleterating/:id",adminauth,deleteRating);


module.exports = router;