import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import backgroundImage from '../../pageBG.png';

Modal.setAppElement('#root');

const CartPage = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useCart();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [shippingAddress, setShippingAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');

    const calculateTotal = () => {
        const total = cartItems.reduce((acc, item) => {
            const price = item?.product?.price || 0;
            const quantity = item?.quantity || 1;
            return acc + price * quantity;
        }, 0);
        return total.toFixed(2);
    };

    const handleCheckout = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const submitCheckout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth/login');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/api/checkout',
                {
                    cartItems,
                    shippingAddress,
                    phoneNumber,
                    paymentMethod,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                alert('Checkout successful!');
                clearCart();
                navigate('/');
            } else {
                alert('Checkout failed. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed. Please try again.');
        }
        closeModal();
    };

    const goBack = () => {
        navigate(-1);
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
            <div
                className="container py-4"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '15px',
                    padding: '2rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                    maxWidth: '900px',
                    width: '100%',
                }}
            >
                <button className="btn btn-secondary mb-3" onClick={goBack}>Back</button>

                {(!cartItems || cartItems.length === 0) ? (
                    <div className="text-center">
                        <h4>Your cart is empty.</h4>
                    </div>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2>Your Cart</h2>
                        </div>

                        <ul className="list-group">
                            {cartItems.map((item) => (
                                <li key={item?.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5>{item?.product?.name || 'Product Name Not Available'}</h5>
                                        <p>₱{item?.product?.price || 'Price Not Available'}</p>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => decreaseQuantity(item.id)}>-</button>
                                            <span className="mx-2">{item?.quantity || 1}</span>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => increaseQuantity(item.id)}>+</button>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-sm btn-danger" onClick={() => removeItem(item.id)}>Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-3 d-flex justify-content-between">
                            <h4>Total: ₱{calculateTotal()}</h4>
                            <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
                        </div>
                    </>
                )}

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Checkout Details">
                    <h2>Checkout Details</h2>
                    <div className="mb-3">
                        <label htmlFor="shippingAddress" className="form-label">Shipping Address</label>
                        <input type="text" className="form-control" id="shippingAddress" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                        <select className="form-select" id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="COD">Cash on Delivery</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>
                    <button className="btn btn-primary me-3" onClick={submitCheckout}>Submit Checkout</button>
                    <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                </Modal>
            </div>
        </div>
    );
};

export default CartPage;
