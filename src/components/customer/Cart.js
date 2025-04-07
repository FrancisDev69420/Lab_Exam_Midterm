import React from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../pageBG.png'; 

const Cart = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back to the previous page
    };

    if (!cart || cart.length === 0) {
        return (
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        borderRadius: '15px',
                        padding: '2rem',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                        width: '100%',
                        maxWidth: '800px',
                    }}
                >
                    <p>Your cart is empty.</p>
                    <Button variant="secondary" onClick={goBack}>Back</Button>
                </div>
            </div>
        );
    }

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
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    borderRadius: '15px',
                    padding: '2rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                    width: '100%',
                    maxWidth: '800px',
                }}
            >
                <h2>Your Cart</h2>
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.product.name} - Quantity: {item.quantity} - Price: ₱{item.product.price}
                        </li>
                    ))}
                </ul>
                <Button variant="secondary" onClick={goBack}>Back</Button>
            </div>
        </div>
    );
};

export default Cart;
