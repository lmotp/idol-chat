const mongoose = require('mongoose');

const subCateogrySchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, require: true },
    group: { type: String, default: 'solo' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('SubCategory', subCateogrySchema);
