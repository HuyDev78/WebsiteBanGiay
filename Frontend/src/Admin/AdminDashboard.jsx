import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '', price: '', oldPrice: '', category: 'nike', image: '', featured: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (activeTab === 'products') {
                    const { data } = await axios.get('http://localhost:5000/api/products');
                    setProducts(data);
                } else if (activeTab === 'users') {
                    const { data } = await axios.get('http://localhost:5000/api/admin/users');
                    setUsers(data);
                } else if (activeTab === 'orders') {
                    const { data } = await axios.get('http://localhost:5000/api/orders');
                    setOrders(data);
                } else if (activeTab === 'revenue') {
                    const { data } = await axios.get('http://localhost:5000/api/stats/revenue');
                    setRevenueData(data);
                }
            } catch (err) {
                console.error('❌ Lỗi khi load dữ liệu:', err);
            }
        };
        fetchData();
    }, [activeTab]);

    const handleSubmit = async () => {
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/admin/products/${editId}`, form);
                alert('✅ Cập nhật sản phẩm thành công!');
                setProducts(prev =>
                    prev.map(p => (p._id === editId ? { ...p, ...form } : p))
                );
            } else {
                const res = await axios.post('http://localhost:5000/api/admin/products', form);
                alert('✅ Thêm sản phẩm thành công!');
                setProducts(prev => [...prev, res.data]);
            }
            setForm({ name: '', price: '', oldPrice: '', category: 'nike', image: '', featured: false });
            setEditId(null);
            setActiveTab('products');
        } catch (err) {
            console.error('❌ Không thể gửi sản phẩm:', err);
        }
    };


    const handleEdit = (p) => {
        setForm({
            name: p.name, price: p.price, oldPrice: p.oldPrice,
            category: p.category, image: p.image, featured: p.featured
        });
        setEditId(p._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            console.error('❌ Xoá thất bại', err);
        }
    };

    const handleToggleAdmin = async (userId) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${userId}/promote`);
            alert('✅ Người dùng đã được cập nhật thành Admin');
            const { data } = await axios.get('http://localhost:5000/api/admin/users');
            setUsers(data);
        } catch (err) {
            console.error('❌ Cập nhật quyền thất bại', err);
            alert('❌ Không thể thay đổi quyền');
        }
    };

    const handleOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
            alert('✅ Cập nhật trạng thái đơn hàng thành công');
            setOrders(prev =>
                prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o)
            );
        } catch (err) {
            console.error('❌ Cập nhật trạng thái đơn hàng thất bại:', err);
            alert('❌ Không thể cập nhật trạng thái đơn hàng');
        }
    };

    const handleLogout = () => {
        // Nếu bạn có lưu token: localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-6">📊 Admin Panel</h2>
                    {['products', 'users', 'orders', 'revenue'].map(tab =>
                        <div key={tab}
                            className={`cursor-pointer mb-4 ${activeTab === tab ? 'text-yellow-400' : ''}`}
                            onClick={() => setActiveTab(tab)}>
                            {tab === 'products' ? '📦 Sản Phẩm' : tab === 'users' ? '👤 Người Dùng' : tab === 'orders' ? '📋 Đơn Hàng' : '💰 Doanh Thu'}
                        </div>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-2 px-4 rounded mt-4 hover:bg-red-700"
                >
                    🔒 Đăng xuất
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10 overflow-auto">
                {activeTab === 'products' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">📦 Quản lý sản phẩm</h2>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <input placeholder="Tên" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="p-2 border" />
                            <input placeholder="Giá" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="p-2 border" />
                            <input placeholder="Giá cũ" value={form.oldPrice} onChange={e => setForm(f => ({ ...f, oldPrice: e.target.value }))} className="p-2 border" />
                            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="p-2 border">
                                <option value="nike">Nike</option>
                                <option value="adidas">Adidas</option>
                                <option value="khac">Khác</option>
                            </select>
                            <input placeholder="Link ảnh" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="p-2 border" />
                            <label className="flex items-center"><input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="mr-2" />Nổi bật</label>
                        </div>
                        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded mb-6">
                            {editId ? 'Cập nhật' : 'Thêm'} sản phẩm
                        </button>
                        <table className="w-full bg-white shadow mb-6 text-center font-bold">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2">Hình</th>
                                    <th className="p-2">Tên</th>
                                    <th className="p-2">Giá</th>
                                    <th className="p-2">Giá cũ</th>
                                    <th className="p-2">Loại</th>
                                    <th className="p-2">Nổi bật</th>
                                    <th className="p-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id} className="border-t">
                                        <td className="p-2">
                                            <img src={p.image} alt={p.name} className="w-16 h-16 mx-auto" />
                                        </td>
                                        <td className="p-2">{p.name}</td>
                                        <td className="p-2">{parseInt(p.price).toLocaleString()} VNĐ</td>
                                        <td className="p-2">{parseInt(p.oldPrice).toLocaleString()} VNĐ</td>
                                        <td className="p-2">{p.category}</td>
                                        <td className="p-2">{p.featured ? '✅' : '❌'}</td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => handleEdit(p)}
                                                className="bg-yellow-500 px-3 py-1 mr-2 rounded text-white"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const confirmDelete = window.confirm('⚠️ Bạn có chắc chắn muốn xóa sản phẩm này không?');
                                                    if (confirmDelete) {
                                                        handleDelete(p._id);
                                                    }
                                                }}
                                                className="bg-red-500 px-3 py-1 rounded text-white"
                                            >
                                                Xóa
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}


                {activeTab === 'users' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">👤 Quản lý người dùng</h2>
                        <table className="w-full bg-white shadow text-center font-bold">
                            <thead><tr className="bg-gray-200"><th>Email</th><th>Quyền</th><th>Hành động</th></tr></thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} className="border-b border-gray-200">
                                        <td className="py-3">{u.email}</td>
                                        <td className="py-3">{u.isAdmin ? 'Admin' : 'User'}</td>
                                        <td className="py-3">
                                            {!u.isAdmin && (
                                                <button
                                                    onClick={() => handleToggleAdmin(u._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                >
                                                    Cấp quyền Admin
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">📋 Quản lý đơn hàng</h2>
                        <table className="w-full bg-white shadow text-left font-bold">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-2">Khách hàng</th>
                                    <th className="p-2">Tổng tiền</th>
                                    <th className="p-2">Trạng thái</th>
                                    <th className="p-2">Ngày đặt</th>
                                    <th className="p-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => {
                                    const statusColors = {
                                        'Chưa xác nhận': 'bg-yellow-500 text-white',
                                        'Đã xác nhận': 'bg-blue-500 text-white',
                                        'Đang giao': 'bg-purple-500 text-white',
                                        'Hoàn tất': 'bg-green-500 text-white',
                                        'Đã hủy': 'bg-red-500 text-white',
                                    };

                                    const statusClass = statusColors[order.status] || 'bg-gray-200 text-gray-800';

                                    return (
                                        <tr key={order._id} className="border-t">
                                            <td className="p-2">{order.customerInfo?.email || 'Khách'}</td>
                                            <td className="p-2">{order.total.toLocaleString()} VNĐ</td>
                                            <td className="p-2">
                                                <span className={`px-2 py-1 rounded text-sm font-medium ${statusClass}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                                            <td className="p-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleOrderStatus(order._id, e.target.value)}
                                                    className="border p-1 rounded"
                                                >
                                                    {['Chưa xác nhận', 'Đã xác nhận', 'Đang giao', 'Hoàn tất', 'Đã hủy'].map((s, i) => (
                                                        <option key={i} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'revenue' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">💰 Doanh thu theo tháng</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#4CAF50" />
                            </BarChart>
                        </ResponsiveContainer>

                        {/* Bảng doanh thu chi tiết */}
                        <h3 className="text-xl font-semibold mt-8 mb-2">📋 Bảng chi tiết doanh thu theo tháng</h3>
                        <table className="w-full bg-white shadow text-center font-bold">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2">Tháng</th>
                                    <th className="p-2">Doanh thu (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueData.map(({ month, revenue }) => (
                                    <tr key={month} className="border-t">
                                        <td className="p-2">{month}</td>
                                        <td className="p-2">{revenue.toLocaleString()} VNĐ</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
