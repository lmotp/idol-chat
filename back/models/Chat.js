const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    classId: { type: String, required: true },
    userId: { type: String, required: true, ref: 'User' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Chat', chatSchema);
