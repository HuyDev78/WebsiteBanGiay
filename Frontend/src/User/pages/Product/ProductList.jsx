import { useEffect, useState } from 'react';
import Product from '../../components/product';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products/filter?featured=true')
            .then(res => setProducts(res.data))
            .catch(err => console.error('❌ Lỗi khi lấy sản phẩm nổi bật:', err));
    }, []);

    return (
        <div className="w-full h-auto mx-auto mt-20 px-5">


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-[1200px] mx-auto text-center">
                {products.map((item) => (
                    <Product
                        key={item._id}
                        id={item._id}
                        Url={item.image}
                        Name={item.name}
                        Old={item.oldPrice ? item.oldPrice.toLocaleString() : ''}
                        New={item.price.toLocaleString()}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
