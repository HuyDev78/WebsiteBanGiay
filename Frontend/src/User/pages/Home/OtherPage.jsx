import { useEffect, useState, useContext } from 'react';
import { getProductsByCategory } from '../../../services/ProductService';
import { CartContext } from '../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';

import System from '../../components/system';
import Footer from '../../components/footer';
const OtherPage = () => {
    const [products, setProducts] = useState([]);
    const { addItem } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        getProductsByCategory('khac').then(setProducts);
    }, []);

    const handleAddToCart = (product) => {
        const id = product._id;
        addItem({
            id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        alert("🛒 Sản phẩm đã được thêm vào giỏ hàng!");
    };

    const handleViewDetail = (product) => {
        navigate(`/product/${product._id}`, {
            state: {
                id: product._id,
                name: product.name,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.image
            }
        });
    };

    return (
        <>
            <Header />
            <div className="p-10 min-h-screen bg-gradient-to-b from-black to-red-900 text-white">
                <h2 className="text-3xl font-bold mb-8 text-center">🔥 Sản phẩm khác</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
                    {products.map(product => (
                        <div key={product._id} className="bg-white text-black rounded-xl p-4 shadow-lg hover:scale-105 transition">
                            <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-4" />
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <div className="flex justify-between mt-2 items-center">
                                {product.oldPrice && (
                                    <span className="text-gray-500 line-through text-sm">
                                        {product.oldPrice.toLocaleString()} Đ
                                    </span>
                                )}
                                <span className="text-red-600 font-semibold text-lg">
                                    {product.price.toLocaleString()} Đ
                                </span>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 text-sm"
                                >
                                    🛒 Add to Cart
                                </button>
                                <button
                                    onClick={() => handleViewDetail(product)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm"
                                >
                                    🔍 Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <System />
            <Footer />
        </>
    );
};

export default OtherPage;
