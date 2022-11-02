const mongoose = require('mongoose');
const { ObjectId } = mongoose;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 70,
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
