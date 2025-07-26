import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import logo from '../../assets/logo.jpg';
import banner from '../../assets/banner.webp';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { cartItems } = useContext(CartContext);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();

    const handleCart = () => {
        navigate('/cart');
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/login');
    };

    const email = localStorage.getItem('email') || 'khách';

    return (
        <>
            <div className='w-full h-[100px] border border-black p-5 flex items-center justify-between bg-black'>

                <div className="flex items-center">
                    <img className='w-[150px] h-auto' src={logo} alt='logo' onClick={() => navigate('/HomePage')} />
                </div>
                <div>
                    <ul className='flex text-2xl font-bold text-white space-x-20'>
                        <li className=' hover:text-red-500 cursor-pointer' onClick={() => navigate('/nike')}>NIKE</li>
                        <li className=' hover:text-red-500 cursor-pointer' onClick={() => navigate('/adidas')}>ADIDAS</li>
                        <li className=' hover:text-red-500 cursor-pointer' onClick={() => navigate('/other')}>HÃNG KHÁC</li>
                        <li className=' hover:text-red-500 cursor-pointer' onClick={() => navigate('/orders')}>ĐƠN HÀNG</li>
                    </ul>
                </div>
                <div className='flex items-center'>
                    <div className="ml-6 text-white text-sm text-center">
                        <p className="font-medium">Xin chào, {email}</p>
                        <button onClick={handleLogout} className="text-red-400 hover:underline text-xs cursor-pointer">Đăng xuất</button>
                    </div>
                    <div className="relative ml-6 cursor-pointer" onClick={handleCart}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2}
                            viewBox="0 0 24 24">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19m-4-8v8" />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {totalItems}
                        </span>
                    </div>

                </div>
            </div>

            <img src={banner} alt='banner' />
        </>
    );
};

export default Header;
