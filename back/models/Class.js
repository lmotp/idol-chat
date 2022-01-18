const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    category: { type: String, required: true },
    className: { type: String, required: true },
    classTarget: { type: String, required: true },
    member: [{ type: String, validate: [arrayLimit] }],
    memberCount: { type: Number, required: true },
    makeUser: { type: String, required: true },
    thumnail: { type: String, default: null },
    hashTag: [{ type: String }],
  },
  { timestamps: true },
);

function arrayLimit(val) {
  return val.length <= 20;
}

module.exports = mongoose.model('Class', classSchema);
