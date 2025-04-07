import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../pageBG.png';

const CustomerStorefront = () => {
    const { addToCart, fetchCartItems, cartItems } = useCart();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        fetchProducts();

        if (token) {
            fetchCartItems();
        }
    }, [fetchCartItems]);

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('../auth/login');
        } else {
            try {
                await addToCart(product);
                await fetchCartItems();
                setSuccessMessage(`${product.name} added to cart!`);
                setTimeout(() => setSuccessMessage(''), 2500); // Hide after 2.5 sec
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const handleAuthButton = () => {
        if (isAuthenticated) {
            const confirmed = window.confirm('Are you sure you want to logout?');
            if (confirmed) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate(0);
            }
        } else {
            navigate('../auth/Login');
        }
    };

    const handleCartClick = () => navigate('/customer/cart');

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '2rem',
            }}
        >
            <div
                className="container py-4"
                style={{
                    borderRadius: '15px',
                    padding: '2rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-center m-0" style={{ color: 'white' }}>G9-TECH</h1>
                    <div className="d-flex align-items-center">
                        {isAuthenticated && (
                            <button className="btn btn-outline-info me-2 fw-bold" onClick={handleCartClick}>
                                Cart ({cartItems ? cartItems.length : 0})
                            </button>
                        )}
                        <button className="btn btn-outline-danger fw-bold" onClick={handleAuthButton}>
                            {isAuthenticated ? 'Logout' : 'Login'}
                        </button>
                    </div>
                </div>

                {/* ✅ Success alert */}
                {successMessage && (
                    <div className="alert alert-success text-center fw-bold" role="alert">
                        {successMessage}
                    </div>
                )}

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
                        <div className="col-12 text-center">
                            <p className="text-muted fs-5">No products found.</p>
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card h-100 shadow-sm">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="card-img-top"
                                            style={{ objectFit: 'cover', height: '200px' }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                height: '200px',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#999',
                                            }}
                                        >
                                            No Image Available
                                        </div>
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-bold">{product.name}</h5>
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
        </div>
    );
};

export default CustomerStorefront;
