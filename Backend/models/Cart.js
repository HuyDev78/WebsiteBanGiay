
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  image: String,
  price: Number,
  quantity: Number,
  size: Number,
});

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [cartItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
