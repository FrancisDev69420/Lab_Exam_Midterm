import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const handleRemove = (item) => {
        removeFromCart(item.id);
    };

    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => handleRemove(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;