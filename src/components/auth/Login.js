import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000'; // Your Laravel backend URL

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to local storage after successful login
        localStorage.setItem('token', data.token);

        // Check user role and navigate accordingly
        if (data.role === 'employee') {
          navigate('/admin/AdminPanel'); // Redirect to admin panel for employee
        } else {
          navigate('/store'); // Redirect to store for regular user
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Group 9 Store</h1>
      <h3 className="text-center">Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group mb-3">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary btn-block">Login</button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <a href="/auth/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
