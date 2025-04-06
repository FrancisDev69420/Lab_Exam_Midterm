import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import ProductList from './ProductList';

const API_BASE_URL = 'http://localhost:8000';

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleCheckoutRedirect = () => {
    navigate('/admin/CheckOutMonitoring');
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await fetch(`${API_BASE_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('token');
      navigate('/auth/login');
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Panel</h2>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <ProductList />

      <Button
        variant="secondary"
        onClick={handleCheckoutRedirect}
        className="mt-4"
      >
        Go to Checkout Monitoring
      </Button>
    </Container>
  );
};

export default AdminPanel;
