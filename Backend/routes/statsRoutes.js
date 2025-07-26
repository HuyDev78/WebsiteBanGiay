const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/revenue', async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const revenueByMonth = await Order.aggregate([
            {
                $match: {
                    status: { $ne: 'Đã hủy' },
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
                        $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    revenue: { $sum: '$total' }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: '$_id',
                    revenue: 1
                }
            },
            { $sort: { month: 1 } }
        ]);

        // Tạo mảng 12 tháng với doanh thu mặc định = 0
        const fullYearRevenue = Array.from({ length: 12 }, (_, i) => ({
            month: `${(i + 1).toString().padStart(2, '0')}`,
            revenue: 0
        }));

        // Cập nhật doanh thu theo dữ liệu aggregate
        revenueByMonth.forEach(({ month, revenue }) => {
            fullYearRevenue[month - 1].revenue = revenue;
        });

        res.json(fullYearRevenue);
    } catch (err) {
        console.error('Lỗi khi tính doanh thu:', err);
        res.status(500).json({ message: 'Lỗi máy chủ khi lấy doanh thu' });
    }
});

module.exports = router;
