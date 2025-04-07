import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import ProductList from './ProductList';
import backgroundImage from '../../pageBG.png';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:8000';

const AdminPanel = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Redirects to the Checkout Monitoring page
  const handleCheckoutRedirect = () => {
    navigate('/admin/CheckOutMonitoring');
  };

  // Handles logout process
  const handleLogout = async () => {
    const token = localStorage.getItem('token'); // Get token from local storage

    try {
      // Send logout request to backend
      await fetch(`${API_BASE_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
    } catch (error) {
      // Log any errors that occur during logout
      console.error('Logout failed', error);
    } finally {
      // Clear local storage and redirect to login page
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
