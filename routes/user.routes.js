const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const clientauth = require("../middlewares/clientauth");
const adminauth = require("../middlewares/adminauth");

const multer = require("multer");
const path = require("path");

// upload profile pic
const profilePicStorage = multer.diskStorage({
  destination: "./upload/userImages",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadProfilePic = multer({
  storage: profilePicStorage,
});

// upload work demo
const workDemoStorage = multer.diskStorage({
  destination: "./upload/userImages",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadWorkDemo = multer({
  storage: workDemoStorage,
});

const {
  login,
  userSignup,
  editUserDetails,
  editUserPass,
  userForgotPassword,
  clientSignup,
  editClientDetails,
  editClientPass,
  clientForgotPassword,
  deleteUser,
  deleteClient,
  getAllClients,
  getAllUsers,
  addWorkdemo,
  deleteWorkdemo,
  getMyUserworkImages,
  getAllUserworkImages,
} = require("../controllers/user.controller");

// common routes
router.post("/login", login);

// user routes
router.post("/signupUser", uploadProfilePic.array("profilePic", 1), userSignup);
router.put("/editUser/:id", auth, editUserDetails);
router.put("/editPasswordUser/:id", auth, editUserPass);
router.put("/forgotPasswordUser", userForgotPassword);
// ---------------------------------------------------
// add workdemo
router.post(
  "/addWorkDemo",
  auth,
  uploadWorkDemo.array("workDemo", 1),
  addWorkdemo
);
router.get("/getMyWorkImage", auth, getMyUserworkImages);
router.delete("/deleteMyWorkDemo/:id", auth, deleteWorkdemo);

// client routes
router.post("/signupClient", clientSignup);
router.put("/editClient/:id", clientauth, editClientDetails);
router.put("/editPasswordClient/:id", clientauth, editClientPass);
router.put("/forgotPasswordClient", clientForgotPassword);
router.get("/getAllUsersClient", clientauth, getAllUsers);

// ------------------------
// work images
router.get("/getAllWorkImages", clientauth, getAllUserworkImages);

// routes of admin
router.delete("/deleteUser/:id", auth, adminauth, deleteUser);
router.delete("/deleteClient/:id", auth, adminauth, deleteClient);
router.get("/getAllUsers", auth, adminauth, getAllUsers);
router.get("/getAllClients", auth, adminauth, getAllClients);

module.exports = router;
