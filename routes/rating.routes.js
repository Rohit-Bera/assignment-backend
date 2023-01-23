const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminauth = require("../middlewares/adminauth");
const clientauth = require("../middlewares/clientauth");
const {postRating} = require("../controllers/rating.controller");

router.post("/postrating/:id",clientauth,postRating);

module.exports = router;