const express = require("express");
const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");
const socketModule = require("../socket/socket.js");
const getReceiverSocketId = socketModule.getReceiverSocketId;
const io = socketModule.io;

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const { senderId } = req.query;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    console.log(messages.length);
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/send/:id", async (req, res) => {
  try {
    const { message, senderId } = req.body;
    const { id: receiverId } = req.params;
    console.log(message);
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // Socket.io functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    console.log("Sending message");
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
