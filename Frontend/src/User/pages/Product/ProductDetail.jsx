import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../../contexts/CartContext';

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addItem } = useContext(CartContext);
    const product = location.state;

    const [selectedSize, setSelectedSize] = useState(null);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-red-500 text-xl">Không tìm thấy sản phẩm. Vui lòng quay lại trang chủ.</p>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
            return;
        }
        addItem({
            id: product.id + selectedSize,
            name: product.name,
            price: parseFloat(product.price.replace('.', '').replace('Đ', '')),
            image: product.image,
            size: selectedSize,
        });
        alert("🛒 Sản phẩm đã được thêm vào giỏ hàng!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                <div className="flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="w-full max-h-[400px] object-contain rounded-xl" />
                </div>


                <div className="space-y-5 text-gray-800">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-xl text-gray-500 line-through">{product.oldPrice} Đ</p>
                    <p className="text-3xl text-red-600 font-extrabold">{product.price} Đ</p>


                    <div>
                        <h3 className="font-semibold mb-2">Chọn size:</h3>
                        <div className="flex gap-3">
                            {[41, 42, 43, 44].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-full border font-semibold transition ${selectedSize === size
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <button
                            onClick={handleAddToCart}
                            className="w-full md:w-auto px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                        >
                            Add to cart
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full md:w-auto px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg"
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
