import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../../../assets/background.jpg';
import { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContext';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');
    const { setCartItems } = useContext(CartContext);

    const validateEmail = (email) => {
        if (!email) return 'Vui lòng nhập email';
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) return 'Email không hợp lệ';
        return '';
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailError('');
        setLoginError('');

        const emailValidation = validateEmail(email);
        if (emailValidation) {
            setEmailError(emailValidation);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
            });

            const { token, user } = res.data;
            console.log('✅ USER LOGIN:', user);
            if (token && user?._id) {
                // ✅ Lưu thông tin người dùng
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user._id);
                localStorage.setItem('email', user.email);
                localStorage.setItem('isAdmin', user.isAdmin);
                const cartRes = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
                setCartItems(cartRes.data.items || []);

                alert('✅ Đăng nhập thành công!');

                // ✅ Điều hướng theo quyền
                if (user.isAdmin === true || user.isAdmin === 'true') {
                    navigate('/admin');
                } else {
                    navigate('/HomePage');
                }
            } else {
                setLoginError('Đăng nhập thất bại (thiếu token hoặc thông tin user)');
            }
        } catch (err) {
            setLoginError(err.response?.data?.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <div
            className="w-full h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-xl p-8 w-96 text-black border border-gray-300">
                <h1 className="text-3xl font-bold text-center mb-6">Đăng nhập</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setEmailError(validateEmail(email))}
                            className="w-full px-4 py-2 rounded-lg bg-white border border-black text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nhập email"
                        />
                        {emailError && (
                            <p className="text-red-600 text-sm mt-1">{emailError}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white border border-black text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>
                    {loginError && (
                        <p className="text-red-600 text-sm mt-1">{loginError}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
                    >
                        Đăng nhập
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Chưa có tài khoản?{' '}
                    <a
                        href="/register"
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
