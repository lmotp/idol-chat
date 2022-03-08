const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    classId: { type: String, required: true, ref: 'Class' },
    name: { type: String, required: true },
    place: { type: String, required: true },
    price: { type: String, required: true },
    memberCount: { type: Number, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    attendMember: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Meeting', meetingSchema);
