const express = require("express");
const router = express.Router();
const clientauth = require("../middlewares/clientauth");
const adminauth = require("../middlewares/adminauth");
const auth = require("../middlewares/auth");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/clientAttachments",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

const {
  postAssignmentApi,
  getMyAssignmentApi,
  updateAssignmentApi,
  deleteAssignmentApi,
  getAssignmentListApi,
  searchAssignmentbyName,
} = require("../controllers/assignment.controller");

// client
router.post(
  "/uploadTask",
  clientauth,
  upload.array("attachments", 6),
  postAssignmentApi
);
router.get("/getMyTask/:id", clientauth, getMyAssignmentApi);
router.put(
  "/updateTask/:id",
  clientauth,
  upload.array("attachments", 6),
  updateAssignmentApi
);
router.delete("/deleteMyTask/:id", clientauth, deleteAssignmentApi);

// user
router.get("/userAssignments", auth, getAssignmentListApi);

// admin
router.get("/adminAssignments", auth, adminauth, getAssignmentListApi);

// visitor
router.get("/visitorsAssigments", getAssignmentListApi);

router.get("/searchAssignment/:name", searchAssignmentbyName);

module.exports = router;
