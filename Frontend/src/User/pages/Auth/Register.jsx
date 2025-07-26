
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../../../assets/background.jpg';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [submitError, setSubmitError] = useState('');

    const validateEmail = (email) => {
        if (!email) return 'Vui lòng nhập email';
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email) ? '' : 'Email không hợp lệ';
    };

    const validatePassword = (password) => {
        if (!password) return 'Vui lòng nhập mật khẩu';
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
        return regex.test(password)
            ? ''
            : 'Mật khẩu ≥6 ký tự, chứa chữ, số và ký tự đặc biệt';
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (!confirmPassword) return 'Vui lòng nhập lại mật khẩu';
        return password === confirmPassword ? '' : 'Mật khẩu không khớp';
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const eErr = validateEmail(email);
        const pErr = validatePassword(password);
        const cErr = validateConfirmPassword(password, confirmPassword);

        setEmailError(eErr);
        setPasswordError(pErr);
        setConfirmError(cErr);
        setSubmitError('');

        if (eErr || pErr || cErr) return;

        try {
            const res = await axios.post('http://localhost:5000/api/users/register', {
                email,
                password,
            });
            alert(res.data.message || 'Đăng ký thành công!');
            navigate('/');
        } catch (err) {
            setSubmitError(err.response?.data?.message || 'Đăng ký thất bại');
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <img
                src={background}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex items-center justify-center w-full h-full">
                <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-xl p-8 w-96 text-black">
                    <h1 className="text-3xl font-bold text-center mb-6">Đăng ký</h1>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setEmailError(validateEmail(email))}
                                className="w-full px-4 py-2 rounded bg-white/80 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập email"
                                required
                            />
                            {emailError && (
                                <p className="text-red-500 text-sm mt-1">{emailError}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setPasswordError(validatePassword(password))}
                                className="w-full px-4 py-2 rounded bg-white/80 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={() =>
                                    setConfirmError(
                                        validateConfirmPassword(password, confirmPassword)
                                    )
                                }
                                className="w-full px-4 py-2 rounded bg-white/80 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập lại mật khẩu"
                                required
                            />
                            {confirmError && (
                                <p className="text-red-500 text-sm mt-1">{confirmError}</p>
                            )}
                        </div>

                        {submitError && (
                            <p className="text-red-500 text-sm mt-1">{submitError}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-2 mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
                        >
                            Đăng ký
                        </button>
                    </form>

                    <p className="text-center mt-4 text-sm">
                        Đã có tài khoản?{' '}
                        <a href="/" className="text-blue-600 underline hover:text-blue-800">
                            Đăng nhập
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
