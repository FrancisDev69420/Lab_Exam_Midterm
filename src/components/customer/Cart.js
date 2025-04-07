import React from 'react';
import { useCart } from '../../context/CartContext'; // Adjust path as needed

const Cart = () => {
    const { cart } = useCart();

    if (!cart || cart.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.product.product_name} - Quantity: {item.quantity} - Price: ₱{item.product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;