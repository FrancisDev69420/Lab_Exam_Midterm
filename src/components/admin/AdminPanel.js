import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import ProductList from './ProductList';
import backgroundImage from '../../pageBG.png';

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
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container className="p-4 rounded shadow"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          maxWidth: '1000px',
          width: '100%',
        }}
      >
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
    </div>
  );
};

export default AdminPanel;
