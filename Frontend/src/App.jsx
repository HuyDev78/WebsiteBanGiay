
import { Routes, Route } from 'react-router-dom';
import Login from './User/pages/Auth/Login';
import CartPage from './User/pages/Cart/CartPage';
import CheckoutPage from './User/pages/Cart/Checkout';
import OrderPage from './User/pages/Cart/Order'
import Register from './User/pages/Auth/Register'
import OrderListPage from './User/pages/Orders/OrderListPage'
import ProductDetail from './User/pages/Product/ProductDetail';
import NikePage from './User/pages/Home/NikePage'
import AdidasPage from './User/pages/Home/AdidasPage'
import OtherPage from './User/pages/Home/OtherPage'
import AdminDashboard from './Admin/AdminDashboard'
import HomePage from './User/pages/Home/HomePage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order/:id" element={<OrderPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/orders" element={<OrderListPage />} />
      <Route path="/nike" element={<NikePage />} />
      <Route path="/adidas" element={<AdidasPage />} />
      <Route path="/other" element={<OtherPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App
