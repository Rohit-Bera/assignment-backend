const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminauth = require("../middlewares/adminauth");
const clientauth = require("../middlewares/clientauth");
const {
  postuserFeedback,
  getalluserFeedback,
  deleteuserFeedback,
  postClientFeedback,
  getallClientFeedback,
  deleteClientFeedback,
  postComplaintApi,
  getComplaintAPi,
  deleteComplaintApi,
  putComplaintApi,
} = require("../controllers/feedback.controller");

//user routes
router.post("/postUserFeedback", auth, postuserFeedback);
router.get("/getUserFeedback", adminauth, getalluserFeedback);
router.delete("/deleteUserFeedback/:id", adminauth, deleteuserFeedback);

//client routes
router.post("/postClientFeedback", clientauth, postClientFeedback);
router.get("/getClientFeedback", adminauth, getallClientFeedback);
router.delete("/deleteClientFeedback/:id", adminauth, deleteClientFeedback);

// complaints

//user routes
router.post("/postUserComplaints", auth, postComplaintApi);
router.get("/getUserComplaints", auth, getComplaintAPi);
router.delete("/deleteUserComplaints/:id", auth, deleteComplaintApi);
// admin
router.get("/getUserComplaints", adminauth, getComplaintAPi);
router.put("/userComplaintAdminReply/:id", adminauth, putComplaintApi);

//client routes
router.post("/postClientComplaints", clientauth, postComplaintApi);
router.get("/getClientComplaints", clientauth, getComplaintAPi);
router.delete("/deleteClientComplaints/:id", clientauth, deleteComplaintApi);
//admin
router.get("/getClientComplaints", clientauth, getComplaintAPi);
router.put("/clientComplaintAdminReply/:id", adminauth, putComplaintApi);

module.exports = router;
