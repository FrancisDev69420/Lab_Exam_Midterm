import React from 'react';

const Product = ({ product, onAddToCart }) => {
    return (
        <div className="card">
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
                <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Product;