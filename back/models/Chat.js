const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    chat: { type: String, required: true },
    chatId: { type: Number, required: true },
    userId: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Chat', chatSchema);
