const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect('mongodb://127.0.0.1:27017/ShopGiay')
    .then(async () => {
        // Xoá nếu đã có admin
        await User.deleteOne({ email: 'admin@gmail.com' });

        // Tạo tài khoản admin mới
        const admin = new User({
            username: 'admin',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('123456', 10),
            isAdmin: true
        });

        await admin.save();
        console.log('✅ Admin created successfully!');
        process.exit();
    })
    .catch(err => {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    });
