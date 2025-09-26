const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  type: { type: String, required: true },
  shortDescription: { type: String },
  pageDescription: { type: String },
  createdDate: { type: Date, default: Date.now },
  category: { type: String, enum: ["free", "paid"], required: true },
  price: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model("File", fileSchema);
