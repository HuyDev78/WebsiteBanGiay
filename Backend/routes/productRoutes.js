const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm' });
  }
});

// Lọc theo category hoặc featured (nổi bật)
router.get('/filter', async (req, res) => {
  try {
    const { category, featured } = req.query;

    const query = {};
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lọc sản phẩm' });
  }
});

// Thêm sản phẩm mới 
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi thêm sản phẩm' });
  }
});
// Xóa sản phẩm theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json({ message: 'Đã xóa sản phẩm' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
  }
});
// Cập nhật sản phẩm theo ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật sản phẩm' });
  }
});


module.exports = router;
