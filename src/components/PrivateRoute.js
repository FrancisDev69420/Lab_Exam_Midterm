// src/components/PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Check if the user is authenticated 
  const isAuthenticated = localStorage.getItem('token'); 

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // If authenticated, allow access to the protected route
  return element;
};

export default PrivateRoute;
