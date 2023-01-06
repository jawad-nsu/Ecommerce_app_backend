const mongoose = require('mongoose');
const { ObjectId } = mongoose;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 70,
      unique: true,
    },
    description: {
      type: String,
      maxLength: 2000,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxLength: 32,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
