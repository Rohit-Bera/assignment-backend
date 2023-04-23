const HttpError = require("../middlewares/HttpError");
const Chat = require("../models/chatModel");

// user
const userPostMessageService = async ({ userId, clientId, user }) => {
  console.log("user: ", user);
  try {
    const findChats = await Chat.findOne({ userId, clientId });
    console.log("findChats out: ", findChats);

    if (!findChats) {
      const newChat = {
        userId,
        clientId,
        chats: [{ user }],
      };

      const newMessage = new Chat(newChat);

      await newMessage.save();

      return { newMessage };
    }

    const { chats, _id } = findChats;
    console.log("chats: ", chats);

    const ogChat = chats;

    ogChat.push({ user });

    const body = {
      chats: ogChat,
    };

    // chats.push

    const newMessage = await Chat.findByIdAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );

    if (!newMessage) {
      const error = new HttpError(404, "server error");

      return { error };
    }

    return { newMessage };
  } catch (e) {
    const error = new HttpError(500, `Intermal server error : ${e}`);

    return { error };
  }
};

const userChatRoomIdService = async (_id) => {
  try {
    const chatRoom = await Chat.findById({ _id });

    if (!chatRoom) {
      const error = new HttpError(500, `chat room with this id does not exist`);

      return { error };
    }

    return { chatRoom };
  } catch (e) {
    const error = new HttpError(500, `Intermal server error : ${e}`);

    return { error };
  }
};

const getAllCLientChatsService = async ({ userId }) => {
  try {
    const allChats = await Chat.find({ userId })
      .populate("clientId")
      .populate("userId");

    if (!allChats) {
      const error = new HttpError(500, `No chat started yet!`);

      return { error };
    }

    return { allChats };
  } catch (e) {
    const error = new HttpError(500, `Intermal server error : ${e}`);

    return { error };
  }
};

const sendUserAttachmentService = async ({
  userId,
  clientId,
  userAttachment,
}) => {
  console.log("user: ", userAttachment);
  try {
    const findChats = await Chat.findOne({ userId, clientId });
    console.log("findChats out: ", findChats);

    if (!findChats) {
      const newChat = {
        userId,
        clientId,
        chats: [{ userAttachment }],
      };

      const newMessage = new Chat(newChat);

      await newMessage.save();

      return { newMessage };
    }

    const { chats, _id } = findChats;
    console.log("chats: ", chats);

    const ogChat = chats;

    ogChat.push({ userAttachment });

    const body = {
      chats: ogChat,
    };

    // chats.push

    const newMessage = await Chat.findByIdAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );

    if (!newMessage) {
      const error = new HttpError(404, "server error");

      return { error };
    }

    return { newMessage };
  } catch (e) {
    const error = new HttpError(500, `Intermal server error : ${e}`);

    return { error };
  }
};

// client
const clientPostMessageService = async ({ userId, clientId, client }) => {
  console.log("client: ", client);

  try {
    const findChats = await Chat.findOne({ userId, clientId });
    console.log("findChats out: ", findChats);

    if (!findChats) {
      const newChat = {
        userId,
        clientId,
        chats: [{ client }],
      };

      const newMessage = new Chat(newChat);

      await newMessage.save();

      return { newMessage };
    }

    const { chats, _id } = findChats;
    console.log("chats: ", chats);

    const ogChat = chats;

    ogChat.push({ client });

    const body = {
      chats: ogChat,
    };

    // chats.push

    const newMessage = await Chat.findByIdAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );

    if (!newMessage) {
      const error = new HttpError(404, "server error");

      return { error };
    }

    return { newMessage };
  } catch (e) {
    const error = new HttpError(500, `Intermal server error : ${e}`);

    return { error };
  }
};

const clientChatRoomId = async (_id) => {
  try {
    const chatRoom = await Chat.findById({ _id });

    if (!chatRoom) {
      const error = new HttpError(500, `chat room with this id does not exist`);

      return { error };
    }

    return { chatRoom };
  } catch (e) {
    const error = new HttpError(500, `Intermal server error : ${e}`);

    return { error };
  }
};

const getAllUserChatsService = async ({ clientId }) => {
  try {
    const allChats = await Chat.find({ clientId })
      .populate("clientId")
      .populate("userId");

    if (!allChats) {
      const error = new HttpError(500, `No chat started yet!`);

      return { error };
    }

    return { allChats };
  } catch (e) {
    const error = new HttpError(500, `Intermal server error : ${e}`);

    return { error };
  }
};

const sendClientAttachmentService = async ({
  userId,
  clientId,
  clientAttachment,
}) => {
  console.log("client: ", clientAttachment);

  try {
    const findChats = await Chat.findOne({ userId, clientId });
    console.log("findChats out: ", findChats);

    if (!findChats) {
      const newChat = {
        userId,
        clientId,
        chats: [{ clientAttachment }],
      };

      const newMessage = new Chat(newChat);

      await newMessage.save();

      return { newMessage };
    }

    const { chats, _id } = findChats;
    console.log("chats: ", chats);

    const ogChat = chats;

    ogChat.push({ clientAttachment });

    const body = {
      chats: ogChat,
    };

    // chats.push

    const newMessage = await Chat.findByIdAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );

    if (!newMessage) {
      const error = new HttpError(404, "server error");

      return { error };
    }

    return { newMessage };
  } catch (e) {
    const error = new HttpError(500, `Intermal server error : ${e}`);

    return { error };
  }
};

module.exports = {
  userPostMessageService,
  userChatRoomIdService,
  sendUserAttachmentService,
  getAllCLientChatsService,
  clientPostMessageService,
  clientChatRoomId,
  sendClientAttachmentService,
  getAllUserChatsService,
};
