
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Lấy sản phẩm theo category: nike, adidas, khac
 const getProductsByCategory = async (category) => {
  const res = await axios.get(`${API_URL}/filter?category=${category}`);
  return res.data;
};

// Lấy sản phẩm nổi bật
 const getFeaturedProducts = async () => {
  const res = await axios.get(`${API_URL}/filter?featured=true`);
  return res.data;
};

// Lấy toàn bộ sản phẩm (nếu cần)
 const getAllProducts = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};
export { getProductsByCategory, getFeaturedProducts, getAllProducts };  