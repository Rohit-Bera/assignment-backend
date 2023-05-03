const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const clientauth = require("../middlewares/clientauth");
const adminauth = require("../middlewares/adminauth");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/chatAttachments",
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
  userPostMessage,
  userChatRoomId,
  sendAttachmentsFromUser,

  getAllClientChats,
  // ----------
  clientPostMessage,
  clientChatRoomId,
  sendAttachmentsFromClient,
  createClientChatroom,
  getAllUserChats,
} = require("../controllers/chat.controller");

// user
router.put("/postMessageUser", auth, userPostMessage);
router.get("/getUserchatRoomId/:id", auth, userChatRoomId);
router.post(
  "/sendUserAttachments",
  auth,
  upload.array("attachment", 1),
  sendAttachmentsFromUser
);
router.get("/getAllClientChats", auth, getAllClientChats);

// client
router.get("/createClientChatroom/:id", clientauth, createClientChatroom);
router.put("/postMessageClient", clientauth, clientPostMessage);
router.get("/getClientchatRoomId/:id", clientauth, clientChatRoomId);
router.post(
  "/sendClientAttachments",
  clientauth,
  upload.array("attachment", 1),
  sendAttachmentsFromClient
);
router.get("/getAllUserChats", clientauth, getAllUserChats);

module.exports = router;
