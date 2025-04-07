import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import ProductList from './ProductList';

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
    <Container className="mt-5">
      {/* Header section with title and logout button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Panel</h2>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Product list component for managing products */}
      <ProductList />

      {/* Button to navigate to checkout monitoring */}
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
