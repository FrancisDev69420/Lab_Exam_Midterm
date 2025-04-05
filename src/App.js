import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/admin/ProductList';
import CheckoutMonitor from './components/admin/CheckoutMonitor';
import Storefront from './components/customer/Storefront';
import Cart from './components/customer/Cart';
import Checkout from './components/customer/Checkout';
import OrderSummary from './components/customer/OrderSummary';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/monitor" element={<CheckoutMonitor />} />

        {/* Customer routes */}
        <Route path="/" element={<Storefront />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/summary" element={<OrderSummary />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
