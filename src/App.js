import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/admin/ProductList';
import CheckoutMonitoring from './components/admin/CheckoutMonitoring';
import Login from './components/auth/Login';
import Register from './components/auth/register';
import PrivateRoute from './components/PrivateRoute'; // A custom route guard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* Admin Routes - protected */}
        <Route path="/admin/ProductList" element={<ProductList />}  />
        <Route path="/admin/CheckoutMonitoring" element={<PrivateRoute element={<CheckoutMonitoring />} />} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
