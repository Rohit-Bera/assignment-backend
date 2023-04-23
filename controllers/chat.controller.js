const chatService = require("../services/chat.service");

// user
const userPostMessage = async (request, response, next) => {
  const userId = request.user._id;

  const { clientId, user } = request.body;

  const result = await chatService.userPostMessageService({
    userId,
    clientId,
    user,
  });

  const { newMessage, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, newMessage });
};

const userChatRoomId = async (request, response, next) => {
  const id = request.params.id;

  const result = await chatService.userChatRoomIdService(id);

  const { chatRoom, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, chatRoom });
};

const sendAttachmentsFromUser = async (request, response, next) => {
  const userId = request.user._id;

  const { clientId } = request.body;

  const url = request.protocol + "://" + request.get("host");

  const file = url + "/chatAttachments/" + request.files[0].filename;
  const userAttachment = file;

  const result = await chatService.sendUserAttachmentService({
    userId,
    clientId,
    userAttachment,
  });

  const { newMessage, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, newMessage });
};

const getAllClientChats = async (request, response, next) => {
  const userId = request.user._id;

  const result = await chatService.getAllCLientChatsService({ userId });

  const { allChats, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, allChats });
};

// client
const clientPostMessage = async (request, response, next) => {
  const clientId = request.client._id;

  const { userId, client } = request.body;

  const result = await chatService.clientPostMessageService({
    userId,
    clientId,
    client,
  });

  const { newMessage, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, newMessage });
};

const clientChatRoomId = async (request, response, next) => {
  const id = request.params.id;

  const result = await chatService.clientChatRoomId(id);

  const { chatRoom, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, chatRoom });
};

const sendAttachmentsFromClient = async (request, response, next) => {
  const clientId = request.client._id;

  const { userId } = request.body;

  const url = request.protocol + "://" + request.get("host");

  const file = url + "/chatAttachments/" + request.files[0].filename;
  const clientAttachment = file;

  const result = await chatService.sendClientAttachmentService({
    userId,
    clientId,
    clientAttachment,
  });

  const { newMessage, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, newMessage });
};

const getAllUserChats = async (request, response, next) => {
  const clientId = request.client._id;

  const result = await chatService.getAllUserChatsService({ clientId });

  const { allChats, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, allChats });
};

module.exports = {
  userPostMessage,
  userChatRoomId,
  sendAttachmentsFromUser,
  getAllClientChats,
  // ----------
  clientPostMessage,
  clientChatRoomId,
  sendAttachmentsFromClient,
  getAllUserChats,
};
