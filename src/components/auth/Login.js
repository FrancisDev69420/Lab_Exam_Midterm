import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../loginRegisterBG.png'; // Ensure path is correct

const API_BASE_URL = 'http://localhost:8000';

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
        localStorage.setItem('token', data.token);

        if (data.user.role === 'employee') {
          navigate('/admin/AdminPanel');
        } else {
          navigate('/');
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
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div className="container bg-white p-5 rounded shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-3">Login</h3>

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

          <button className="btn btn-primary btn-block w-100">Login</button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <a href="/auth/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
