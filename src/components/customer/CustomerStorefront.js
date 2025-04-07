import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CustomerStorefront = () => {
    const { addToCart, fetchCartItems, cartItems } = useCart();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => setProducts(res.data))
            .catch((err) => console.error('Error fetching products:', err));

        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        if(token){
            fetchCartItems();
        }

    }, [fetchCartItems]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('../auth/login');
        } else {
            try {
                await addToCart(product);
                await fetchCartItems();
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const handleAuthButton = () => {
        if (isAuthenticated) {
            let var1 = window.confirm("Are you sure you want to logout?");
            if (var1) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate(0);
            }
        } else {
            navigate('../auth/login');
        }
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center m-0">Customer Storefront</h1>
                <div className="d-flex align-items-center">
                    {isAuthenticated && (
                        <button className="btn btn-outline-info me-2" onClick={handleCartClick}>
                            Cart ({cartItems ? cartItems.length : 0})
                        </button>
                    )}
                    <button className="btn btn-outline-secondary" onClick={handleAuthButton}>
                        {isAuthenticated ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="form-control"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="row">
                {filteredProducts.length === 0 ? (
                    <div className="col-12">
                        <p>No products found.</p>
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card h-100 shadow-sm">
                                {product.image && (
                                    <img
                                        src={`${product.image}`}
                                        alt={product.product_name}
                                        className="card-img-top"
                                        style={{ objectFit: 'cover', height: '200px' }}
                                    />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text fw-bold">₱{product.price}</p>
                                    <button
                                        className="btn btn-primary mt-auto"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomerStorefront;