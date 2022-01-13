const mongoose = require('mongoose');

const subCateogrySchema = new mongoose.Schema(
  {
    subCategory: { type: String, required: true },
    aincategory: { type: String, require: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('SubCategory', subCateogrySchema);
