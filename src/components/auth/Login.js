import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/store'); // Navigate to store after successful login
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="container mt-5">
      {/* Shop Name Above the Login Form */}
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
