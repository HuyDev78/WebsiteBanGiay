const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    items: [
      {
        productId: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        size: {
          type: String
        }
      }
    ],
    total: {
      type: Number,
      required: true,
      min: 0
    },
    customerInfo: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      paymentMethod: {
        type: String,
        enum: ['cod', 'bank'],
        default: 'cod'
      }
    },
    status: {
      type: String,
      enum: ['Chưa xác nhận', 'Đã xác nhận', 'Đang giao', 'Hoàn tất', 'Đã hủy'],
      default: 'Chưa xác nhận'
    }
  },
  {
    timestamps: true // Tự động tạo createdAt và updatedAt
  }
);

module.exports = mongoose.model('Order', orderSchema);
