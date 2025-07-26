const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');

// Lấy tất cả các user người dùng
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put('/users/:id/promote', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true });
  res.json(user);
});

// Cập nhật trạng thái
router.put('/users/:id/status', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(user);
});

// CRUD Sản phẩm
router.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

router.put('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

router.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Xóa thành công' });
});

// Cập nhật quyền Admin cho user
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: req.body.isAdmin },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật quyền', error: err.message });
  }
});
module.exports = router;