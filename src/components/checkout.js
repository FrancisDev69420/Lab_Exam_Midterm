import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaUserAlt, FaEnvelope, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import item1Image from '../assets/item1.webp';  // Importing images
import item2Image from '../assets/item2.png';
import item3Image from '../assets/item3.png';
import '../components/checkout.css';

const CheckoutPage = () => {
  const [item1Quantity, setItem1Quantity] = useState(2);
  const [item2Quantity, setItem2Quantity] = useState(1);
  const [item3Quantity, setItem3Quantity] = useState(1);

  const handleIncrease = (item) => {
    if (item === 1) setItem1Quantity(item1Quantity + 1);
    if (item === 2) setItem2Quantity(item2Quantity + 1);
    if (item === 3) setItem3Quantity(item3Quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item === 1 && item1Quantity > 0) setItem1Quantity(item1Quantity - 1);
    if (item === 2 && item2Quantity > 0) setItem2Quantity(item2Quantity - 1);
    if (item === 3 && item3Quantity > 0) setItem3Quantity(item3Quantity - 1);
  };

  const calculateSubtotal = () => {
    const item1Price = 20;
    const item2Price = 15;
    const item3Price = 25;
    return item1Price * item1Quantity + item2Price * item2Quantity + item3Price * item3Quantity;
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg p-4 hover-card">
            <h3 className="mb-4 text-center" style={{ fontSize: '2rem' }}>Checkout Form</h3>
            <Form>
              <Form.Group controlId="formBasicName" className="mb-4">
                <Form.Label style={{ fontSize: '1.2rem' }}><FaUserAlt className="me-2" /> Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" size="lg" style={{ fontSize: '1.2rem' }} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label style={{ fontSize: '1.2rem' }}><FaEnvelope className="me-2" /> Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" size="lg" style={{ fontSize: '1.2rem' }} />
              </Form.Group>

              <Form.Group controlId="formBasicAddress" className="mb-4">
                <Form.Label style={{ fontSize: '1.2rem' }}><FaMapMarkerAlt className="me-2" /> Shipping Address</Form.Label>
                <Form.Control type="text" placeholder="Enter your shipping address" size="lg" style={{ fontSize: '1.2rem' }} />
              </Form.Group>

              <Form.Group controlId="formBasicCard" className="mb-4">
                <Form.Label style={{ fontSize: '1.2rem' }}><FaCreditCard className="me-2" /> Credit Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your credit card number" size="lg" style={{ fontSize: '1.2rem' }} />
              </Form.Group>

              <Form.Group className="payment-options">
                <h5 style={{ fontSize: '1.3rem' }}>Select Payment Method:</h5>
                <div className="payment-option">
                  <input type="radio" id="creditCard" name="payment" value="creditCard" />
                  <label htmlFor="creditCard">Credit Card</label>
                </div>
                <div className="payment-option">
                  <input type="radio" id="paypal" name="payment" value="paypal" />
                  <label htmlFor="paypal">PayPal</label>
                </div>
                <div className="payment-option">
                  <input type="radio" id="bankTransfer" name="payment" value="bankTransfer" />
                  <label htmlFor="bankTransfer">Bank Transfer</label>
                </div>
                <div className="payment-option">
                  <input type="radio" id="cod" name="payment" value="cod" />
                  <label htmlFor="cod">COD</label>
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3 py-3 hover-button" style={{ fontSize: '1.2rem' }}>
                Submit Order
              </Button>
            </Form>
          </Card>
        </Col>

        <Col md={8} lg={5} style={{ maxWidth: '100%' }}>
          <Card className="shadow-lg p-4 hover-card">
            <h3 className="mb-3 text-center" style={{ fontSize: '2rem' }}>Order Summary</h3>
            <ul className="list-unstyled">
  
              <li className="d-flex justify-content-between align-items-center mb-3 px-3" style={{ fontSize: '1.3rem' }}>
                <div className="d-flex align-items-center" style={{ gap: '25px', flex: 1 }}>
                  <img src={item1Image} alt="Item 1" style={{ width: '110px', height: '110px' }} />
                  <div style={{ flex: 1 }}>
                    <span><strong>Wireless Headphones</strong></span>
                    <p className="text-muted mb-1" style={{ fontSize: '1rem' }}>
                      Bluetooth 5.0, noise canceling, 30-hour battery life.
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <span>Quantity: {item1Quantity}</span>
                      <div className="d-flex gap-2">
                        <Button variant="outline-secondary" size="sm" onClick={() => handleDecrease(1)}>-</Button>
                        <Button variant="outline-secondary" size="sm" onClick={() => handleIncrease(1)}>+</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '1.4rem', marginLeft: '30px', minWidth: '90px', textAlign: 'right' }}>$40.00</span>
              </li>

              <li className="d-flex justify-content-between align-items-center mb-3 px-3" style={{ fontSize: '1.3rem' }}>
                <div className="d-flex align-items-center" style={{ gap: '25px', flex: 1 }}>
                  <img src={item2Image} alt="Item 2" style={{ width: '110px', height: '110px' }} />
                  <div style={{ flex: 1 }}>
                    <span><strong>Smart Watch</strong></span>
                    <p className="text-muted mb-1" style={{ fontSize: '1rem' }}>
                      Tracks fitness, heart rate, and sleep.
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <span>Quantity: {item2Quantity}</span>
                      <div className="d-flex gap-2">
                        <Button variant="outline-secondary" size="sm" onClick={() => handleDecrease(2)}>-</Button>
                        <Button variant="outline-secondary" size="sm" onClick={() => handleIncrease(2)}>+</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '1.4rem', marginLeft: '30px', minWidth: '90px', textAlign: 'right' }}>$15.00</span>
              </li>

              <li className="d-flex justify-content-between align-items-center mb-3 px-3" style={{ fontSize: '1.3rem' }}>
                <div className="d-flex align-items-center" style={{ gap: '25px', flex: 1 }}>
                  <img src={item3Image} alt="Item 3" style={{ width: '110px', height: '110px' }} />
                  <div style={{ flex: 1 }}>
                    <span><strong>Ergonomic Office Chair</strong></span>
                    <p className="text-muted mb-1" style={{ fontSize: '1rem' }}>
                      Adjustable height, lumbar support, and breathable mesh.
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <span>Quantity: {item3Quantity}</span>
                      <div className="d-flex gap-2">
                        <Button variant="outline-secondary" size="sm" onClick={() => handleDecrease(3)}>-</Button>
                        <Button variant="outline-secondary" size="sm" onClick={() => handleIncrease(3)}>+</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '1.4rem', marginLeft: '30px', minWidth: '90px', textAlign: 'right' }}>$25.00</span>
              </li>

              <hr />
              <li className="d-flex justify-content-between align-items-center mt-2 px-3" style={{ fontSize: '1.6rem' }}>
                <strong>Subtotal</strong>
                <strong>${calculateSubtotal()}</strong>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
