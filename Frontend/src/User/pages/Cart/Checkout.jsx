import { useContext, useState } from 'react';
import { CartContext } from '../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        paymentMethod: 'cod',
    });

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.address) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const orderData = {
            userId,
            items: cartItems.map(item => ({
                productId: item.productId || item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                size: item.size || null,
            })),
            total,
            customerInfo: form,
        };

        try {
            // ✅ Gửi đơn hàng và lấy kết quả
            const res = await axios.post('http://localhost:5000/api/orders', orderData);

            // ✅ Xóa giỏ hàng trên backend
            await axios.post('http://localhost:5000/api/cart', {
                userId,
                items: [],
            });

            // ✅ Xóa giỏ hàng trên frontend
            clearCart();

            // ✅ Điều hướng đến trang chi tiết đơn hàng
            navigate(`/order/${res.data._id}`);
        } catch (err) {
            console.error('Lỗi khi xử lý thanh toán:', err);
            alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold text-center mb-8">💳 Thanh Toán</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                <div className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-xl">
                    <h2 className="text-xl font-bold mb-4">Thông tin khách hàng</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Họ và tên"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    />
                    <textarea
                        name="address"
                        placeholder="Địa chỉ nhận hàng"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white h-24"
                    />
                    <div>
                        <label className="block mb-2 font-semibold">Phương thức thanh toán</label>
                        <select
                            name="paymentMethod"
                            value={form.paymentMethod}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white"
                        >
                            <option value="cod">Tiền mặt khi nhận hàng</option>
                            <option value="bank">Chuyển khoản ngân hàng</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-xl">
                    <h2 className="text-xl font-bold mb-4">🛒 Đơn hàng của bạn</h2>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-400">Không có sản phẩm nào trong giỏ hàng.</p>
                    ) : (
                        <ul className="divide-y divide-gray-600">
                            {cartItems.map((item, idx) => (
                                <li key={idx} className="py-4 flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-sm text-gray-400">x{item.quantity} {item.size && ` - Size ${item.size}`}</p>
                                        </div>
                                    </div>
                                    <p className="text-red-400 font-bold">{(item.price * item.quantity).toLocaleString()} Đ</p>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="text-right text-xl font-bold mt-6">
                        Tổng cộng: <span className="text-red-500">{total.toLocaleString()} Đ</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
                    >
                        Xác nhận thanh toán
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
