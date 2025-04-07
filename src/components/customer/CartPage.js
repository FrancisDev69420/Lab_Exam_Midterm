// src/components/CartPage.js
import React, { useContext, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Important for accessibility

const CartPage = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeItem, fetchCartItems } = useCart();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [shippingAddress, setShippingAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to COD

    if (!cartItems || cartItems.length === 0) {
        return <div className="container py-4">Your cart is empty.</div>;
    }

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
                    cartItems: cartItems,
                    shippingAddress: shippingAddress,
                    phoneNumber: phoneNumber,
                    paymentMethod: paymentMethod,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                alert('Checkout successful!');
                await fetchCartItems();
                navigate('/order-success');
            } else {
                alert('Checkout failed. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed. Please try again.');
        }
        closeModal();
    };

    return (
        <div className="container py-4">
            <h2>Your Cart</h2>
            <ul className="list-group">
                {cartItems.map((item) => (
                    <li key={item?.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{item?.product?.product_name || 'Product Name Not Available'}</h5>
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
                <button className="btn btn-primary" onClick={submitCheckout}>Submit Checkout</button>
                <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
};

export default CartPage;