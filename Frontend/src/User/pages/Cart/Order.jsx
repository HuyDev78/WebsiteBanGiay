import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/orders/${id}`);
                setOrder(res.data);
            } catch (err) {
                console.error("Lỗi khi lấy đơn hàng:", err);
                alert("Không tìm thấy đơn hàng!");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id, navigate]);

    if (loading) {
        return <div className="text-white text-center mt-10 text-xl">Đang tải đơn hàng...</div>;
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-black text-white p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">❌ Không tìm thấy đơn hàng</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 bg-red-500 px-6 py-2 rounded-lg font-bold hover:bg-red-600"
                >
                    Về trang chủ
                </button>
            </div>
        );
    }

    const { customerInfo, items, total } = order;

    return (
        <div className="min-h-screen bg-black text-white p-10">
            <h2 className="text-3xl font-bold mb-6 text-center">📦 Chi Tiết Đơn Hàng</h2>

            <div className="bg-gray-800 p-6 rounded-lg max-w-3xl mx-auto">
                {/* Thông tin khách hàng */}
                <h3 className="text-xl font-bold mb-4">Thông tin khách hàng</h3>
                <div className="space-y-2">
                    <p><strong>Họ tên:</strong> {customerInfo?.name}</p>
                    <p><strong>Email:</strong> {customerInfo?.email}</p>
                    <p><strong>Địa chỉ:</strong> {customerInfo?.address}</p>
                    <p><strong>Thanh toán:</strong> {customerInfo?.paymentMethod === 'cod' ? 'Tiền mặt khi nhận hàng' : 'Chuyển khoản ngân hàng'}</p>
                </div>

                <hr className="my-6 border-gray-600" />

                {/* Danh sách sản phẩm */}
                <h3 className="text-xl font-bold mb-4">Sản phẩm đã đặt:</h3>
                <ul className="space-y-4">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between border-b border-gray-600 pb-2">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                                <div>
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-sm text-gray-300">Số lượng: {item.quantity}</p>
                                    {item.size && <p className="text-sm text-gray-300">Size: {item.size}</p>}
                                </div>
                            </div>
                            <p className="font-bold text-red-400">{(item.price * item.quantity).toLocaleString()} Đ</p>
                        </li>
                    ))}
                </ul>

                {/* Tổng cộng */}
                <div className="text-right mt-6 text-xl font-bold">
                    Tổng cộng: <span className="text-red-500">{total.toLocaleString()} Đ</span>
                </div>

                {/* Nút quay về trang chủ */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/HomePage')}
                        className="bg-red-500 font-bold py-2 px-6 rounded-xl hover:bg-red-600"
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
