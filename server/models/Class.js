const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    category: { type: String, required: true },
    className: { type: String, required: true },
    classTarget: { type: String, required: true },
    member: [{ type: String, validate: [memberArrayLimit] }],
    memberCount: { type: Number, required: true },
    makeUser: { type: String, required: true },
    thumnail: { type: String, default: null },
    hashTag: [{ type: String }],
    meetingDay: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', validate: [meetingDayArrayLimit] }],
    inviteMember: [{ type: String }],
  },
  { timestamps: true },
);

function memberArrayLimit(val) {
  return val.length <= 20;
}

function meetingDayArrayLimit(val) {
  return val.length <= 3;
}

module.exports = mongoose.model('Class', classSchema);
