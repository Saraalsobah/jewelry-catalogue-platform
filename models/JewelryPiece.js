const mongoose = require("mongoose");

const jewelrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

const JewelryPiece = mongoose.model("JewelryPiece", jewelrySchema);

module.exports = JewelryPiece;
