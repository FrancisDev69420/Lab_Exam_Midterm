// src/context/CartContext.js
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const addToCart = async (product) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.post('http://localhost:8000/api/cart/add', {
                product_id: product.id,
                quantity: 1,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCartItems();
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const fetchCartItems = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            if (isMounted.current) {
                setCartItems([]);
            }
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (isMounted.current) {
                setCartItems(response.data);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            if (isMounted.current) {
                setCartItems([]);
            }
        }
    }, []);

    const increaseQuantity = async (itemId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const item = cartItems.find(i => i.id === itemId);
            if (!item) return;

            await axios.put(`http://localhost:8000/api/cart/${itemId}`, {
                quantity: item.quantity + 1,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCartItems();
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const decreaseQuantity = async (itemId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const item = cartItems.find(i => i.id === itemId);
            if (!item) return;
            if(item.quantity <= 1) return; //prevent negative quantities

            await axios.put(`http://localhost:8000/api/cart/${itemId}`, {
                quantity: item.quantity - 1,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCartItems();
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    const removeItem = async (itemId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.delete(`http://localhost:8000/api/cart/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCartItems();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const value = {
        cartItems,
        addToCart,
        fetchCartItems,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);