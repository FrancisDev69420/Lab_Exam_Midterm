import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/admin/ProductList';
import CheckOutMonitoring from './components/admin/CheckOutMonitoring';
import Login from './components/auth/Login';
import Register from './components/auth/register';
import AdminPanel from './components/admin/AdminPanel';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* Admin Routes - protected */}
        <Route path="/admin/ProductList" element={<ProductList />}  />
        <Route path="/admin/CheckOutMonitoring" element={<CheckOutMonitoring />} />
        <Route path="/admin/AdminPanel" element={<AdminPanel />} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
