const mongoose = require('mongoose');
const Product = require('../models/Product');

mongoose.connect('mongodb://127.0.0.1:27017/ShopGiay')
    .then(async () => {
        await Product.deleteMany({});
        await Product.insertMany([
            // === NIKE (8 sản phẩm) ===
            {
                name: 'Nike Jordan 1',
                image: '/images/GiayNike1.png',
                price: 500000,
                oldPrice: 650000,
                category: 'nike',
                featured: true
            },
            {
                name: 'Nike Air Max 90',
                image: '/images/GiayNike2.png',
                price: 470000,
                oldPrice: 600000,
                category: 'nike',
                featured: false
            },
            {
                name: 'Nike React Vision',
                image: '/images/GiayNike3.png',
                price: 520000,
                oldPrice: 620000,
                category: 'nike',
                featured: true
            },
            {
                name: 'Nike Air Force 1',
                image: '/images/GiayNike4.png',
                price: 480000,
                oldPrice: 600000,
                category: 'nike',
                featured: false
            },
            {
                name: 'Nike Blazer Mid',
                image: '/images/GiayNike5.png',
                price: 510000,
                oldPrice: 590000,
                category: 'nike',
                featured: false
            },
            {
                name: 'Nike Waffle One',
                image: '/images/GiayNike6.png',
                price: 495000,
                oldPrice: 580000,
                category: 'nike',
                featured: false
            },
            {
                name: 'Nike Air Zoom Pegasus',
                image: '/images/GiayNike7.png',
                price: 550000,
                oldPrice: 680000,
                category: 'nike',
                featured: false
            },
            {
                name: 'Nike Court Vision Low',
                image: '/images/GiayNike8.png',
                price: 460000,
                oldPrice: 550000,
                category: 'nike',
                featured: false
            },

            // === ADIDAS (8 sản phẩm) ===
            {
                name: 'Adidas Superstar',
                image: '/images/GiayAdidas1.png',
                price: 420000,
                oldPrice: 500000,
                category: 'adidas',
                featured: true
            },
            {
                name: 'Adidas UltraBoost',
                image: '/images/GiayAdidas2.png',
                price: 580000,
                oldPrice: 700000,
                category: 'adidas',
                featured: false
            },
            {
                name: 'Adidas Stan Smith',
                image: '/images/GiayAdidas3.png',
                price: 430000,
                oldPrice: 550000,
                category: 'adidas',
                featured: false
            },
            {
                name: 'Adidas Forum Low',
                image: '/images/GiayAdidas4.png',
                price: 490000,
                oldPrice: 590000,
                category: 'adidas',
                featured: false
            },
            {
                name: 'Adidas Gazelle',
                image: '/images/GiayAdidas5.png',
                price: 470000,
                oldPrice: 580000,
                category: 'adidas',
                featured: false
            },
            {
                name: 'Adidas Samba',
                image: '/images/GiayAdidas6.png',
                price: 455000,
                oldPrice: 560000,
                category: 'adidas',
                featured: false
            },
            {
                name: 'Adidas NMD_R1',
                image: '/images/GiayAdidas7.png',
                price: 590000,
                oldPrice: 720000,
                category: 'adidas',
                featured: false
            },
            {
                name: 'Adidas ZX 2K Boost',
                image: '/images/GiayAdidas8.png',
                price: 530000,
                oldPrice: 640000,
                category: 'adidas',
                featured: false
            },

            // === KHÁC  ===
            {
                name: 'Vans Old Skool',
                image: '/images/GiayKhac1.png',
                price: 390000,
                oldPrice: 450000,
                category: 'khac',
                featured: false
            },
            {
                name: 'Converse Chuck 70',
                image: '/images/GiayKhac2.png',
                price: 370000,
                oldPrice: 420000,
                category: 'khac',
                featured: false
            },
            {
                name: 'Puma Suede Classic',
                image: '/images/GiayKhac3.png',
                price: 410000,
                oldPrice: 500000,
                category: 'khac',
                featured: false
            },
            {
                name: 'New Balance 574',
                image: '/images/GiayKhac4.png',
                price: 520000,
                oldPrice: 600000,
                category: 'khac',
                featured: true
            },
            {
                name: 'Reebok Classic Leather',
                image: '/images/GiayKhac5.png',
                price: 450000,
                oldPrice: 560000,
                category: 'khac',
                featured: false
            },
            {
                name: 'Asics Gel Lyte III',
                image: '/images/GiayKhac6.png',
                price: 480000,
                oldPrice: 590000,
                category: 'khac',
                featured: false
            },
            {
                name: 'Fila Disruptor',
                image: '/images/GiayKhac7.png',
                price: 460000,
                oldPrice: 580000,
                category: 'khac',
                featured: false
            },
            {
                name: 'Yeezy Boost 350',
                image: '/images/GiayKhac8.png',
                price: 350000,
                oldPrice: 420000,
                category: 'khac',
                featured: false
            }
        ]);

        console.log('✅ Đã thêm 24 sản phẩm mẫu (8 Nike, 8 Adidas, 8 Khác, 4 Featured)');
        process.exit();
    })
    .catch(err => console.error('❌ Lỗi khi thêm sản phẩm:', err));
