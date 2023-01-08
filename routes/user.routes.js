const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const clientauth = require("../middlewares/clientauth");

const adminauth = require("../middlewares/adminauth");

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
} = require("../controllers/user.controller");

// common routes
router.post("/login", login);

// user routes
router.post("/signupUser", userSignup);
router.put("/editUser/:id", auth, editUserDetails);
router.put("/editPasswordUser/:id", auth, editUserPass);
router.put("/forgotPasswordUser", userForgotPassword);

// client routes
router.post("/signupClient", clientSignup);
router.put("/editClient/:id", clientauth, editClientDetails);
router.put("/editPasswordClient/:id", clientauth, editClientPass);
router.put("/forgotPasswordClient", clientForgotPassword);

// routes of admin
router.delete("/deleteUser/:id", auth, adminauth, deleteUser);
router.delete("/deleteClient/:id", auth, adminauth, deleteClient);
router.get("/getAllUsers", auth, adminauth, getAllUsers);
router.get("/getAllClients", auth, adminauth, getAllClients);

module.exports = router;
