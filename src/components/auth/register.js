import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaUserAlt, FaEnvelope, FaLock, FaLockOpen } from 'react-icons/fa'; // Importing icons
import '../../styles/register.css'; 
import api from '../../api'; // Axios instance
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = 'Passwords do not match';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  try {
    await api.post('/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword
    });

    alert('Registration successful! Please login.');
    navigate('/login');
  } catch (err) {
      const backendErrors = err.response?.data?.errors;
      if (backendErrors) {
        setErrors({
          name: backendErrors.name?.[0] || '',
          email: backendErrors.email?.[0] || '',
          password: backendErrors.password?.[0] || '',
          confirmPassword: '',
        });
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };



  return (
    <div className="container">
      <h2>Create Account</h2>
      <Form onSubmit={handleSubmit}>
        {/* Name Input */}
        <Form.Group className="mb-4">
          <Form.Label className="form-label">Full Name</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaUserAlt /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={errors.name}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        {/* Email Input */}
        <Form.Group className="mb-4">
          <Form.Label className="form-label">Email address</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaEnvelope /></InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={errors.email}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        {/* Password Input */}
        <Form.Group className="mb-4">
          <Form.Label className="form-label">Password</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaLock /></InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Create a password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={errors.password}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        {/* Confirm Password Input */}
        <Form.Group className="mb-4">
          <Form.Label className="form-label">Confirm Password</Form.Label>
          <InputGroup>
            <InputGroup.Text><FaLockOpen /></InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={errors.confirmPassword}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="btn">
          Register
        </Button>

        {/* Already have an account */}
        <p className="text-muted text-center mt-4">
          Already have an account? <a href="/auth/login">Login here</a>
        </p>
      </Form>
    </div>
  );
}

export default Register;
