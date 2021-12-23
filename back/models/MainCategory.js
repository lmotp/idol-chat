const mongoose = require('mongoose');

const mainCateogrySchema = new mongoose.Schema(
  {
    mainCateogry: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('MainCategory', mainCateogrySchema);
