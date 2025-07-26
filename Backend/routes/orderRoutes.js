const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Tạo đơn hàng mới
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi tạo đơn hàng', error: err });
    }
});
//  Lấy tất cả đơn hàng (admin) hoặc đơn hàng theo userId
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;

        const orders = userId
            ? await Order.find({ userId }).sort({ createdAt: -1 })
            : await Order.find().sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err });
    }
});


// Lấy chi tiết đơn hàng theo id
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy chi tiết đơn hàng', error: err });
    }
});
// Cập nhật trạng thái đơn hàng
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi cập nhật trạng thái đơn hàng', error: err });
    }
});
module.exports = router;
