
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

//lấy giỏ hàng theo userId
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy giỏ hàng' });
  }
});

//Lưu hoặc cập nhật giỏ hàng
router.post('/', async (req, res) => {
  const { userId, items } = req.body;
  try {
    const existing = await Cart.findOne({ userId });
    if (existing) {
      existing.items = items;
      await existing.save();
      res.json(existing);
    } else {
      const newCart = await Cart.create({ userId, items });
      res.json(newCart);
    }
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lưu giỏ hàng' });
  }
});

// Xóa giỏ hàng khi thanh toán
router.delete('/:userId', async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.params.userId });
    res.json({ message: 'Đã xóa giỏ hàng' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi xóa giỏ hàng' });
  }
});

module.exports = router;
