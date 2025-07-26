import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/orders?userId=${userId}`);
                setOrders(res.data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", err);
                alert("Không thể lấy dữ liệu đơn hàng!");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [userId]);

    if (loading) {
        return <div className="text-white text-center mt-10 text-xl">Đang tải đơn hàng...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-10">
            <h2 className="text-3xl font-bold text-center mb-8">🧾 Đơn Hàng Của Bạn</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-400">Bạn chưa có đơn hàng nào.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Mã đơn hàng</th>
                                <th className="py-3 px-4 text-left">Thời gian đặt</th> 
                                <th className="py-3 px-4 text-left">Trạng thái</th>
                                <th className="py-3 px-4 text-left">Tổng tiền</th>
                                <th className="py-3 px-4 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                const date = new Date(order.createdAt); 
                                const formattedDate = date.toLocaleString('vi-VN'); 

                                return (
                                    <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-600 transition">
                                        <td className="py-3 px-4">{order._id}</td>
                                        <td className="py-3 px-4">{formattedDate}</td> 
                                        <td className="py-3 px-4 text-yellow-400 font-semibold">
                                            {order.status || 'Chưa xác nhận'}
                                        </td>
                                        <td className="py-3 px-4 text-red-400 font-bold">
                                            {order.total.toLocaleString()} Đ
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() => navigate(`/order/${order._id}`)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold cursor-pointer"
                                            >
                                                Xem chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderListPage;
