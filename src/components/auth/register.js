import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:8000'; // Your Laravel backend URL

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form is submitting...');
    setErrors({});
    setMessage('');

    if(formData.password==formData.password_confirmation){
        try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: 'customer',
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Registration successful! Redirecting...');
            setTimeout(() => {
            navigate('/auth/login');
            }, 1500);
        } else if (response.status === 422) {
            // Validation errors returned by Laravel
            setErrors(data.errors || {});
        } else {
            setMessage('Registration failed. Try again.');
        }
        } catch (err) {
            console.error('Error:', err);
            setMessage('Failed to connect to the server.');
        }
    }else{
        setErrors('Password not matched. Try again.');
    }
    
  };

  return (
    <Container style={{ maxWidth: '500px' }} className="mt-5">
      <h3 className="mb-4">Create an Account</h3>

      {message && <Alert variant="success">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            isInvalid={!!errors.password_confirmation}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.password_confirmation}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
