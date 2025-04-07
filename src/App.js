import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/admin/ProductList';
import CheckOutMonitoring from './components/admin/CheckOutMonitoring';
import Login from './components/auth/Login';
import Register from './components/auth/register';
import AdminPanel from './components/admin/AdminPanel';
import { CartProvider } from './context/CartContext';
import CustomerStorefront from './components/customer/CustomerStorefront';
import CartPage from './components/customer/CartPage';

function App() {
  
  return (
    <CartProvider>
        <Router>
            <Routes>
                <Route path="/" element={<CustomerStorefront />} />
                <Route path="/cart" element={<CartPage />} />
                
                {/* Admin Routes - protected */}
                <Route path="/admin/ProductList" element={<ProductList />}  />
                <Route path="/admin/CheckOutMonitoring" element={<CheckOutMonitoring />} />
                <Route path="/admin/AdminPanel" element={<AdminPanel />} />

                {/* Auth Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
            </Routes>
        </Router>
    </CartProvider>
);
}

export default App;
