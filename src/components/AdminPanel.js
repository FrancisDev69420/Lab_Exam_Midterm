import React, { useState, useEffect } from 'react';
import ProductManagement from './ProductManagement';
import TransactionMonitoring from './TransactionMonitoring';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch initial product data (replace with your API endpoint)
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));

    // Fetch initial transaction data (replace with your API endpoint)
    fetch('/api/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);

  const handleProductUpdate = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  const handleTransactionUpdate = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ProductManagement products={products} onProductUpdate={handleProductUpdate} />
      <TransactionMonitoring transactions={transactions} onTransactionUpdate={handleTransactionUpdate} />
    </div>
  );
};

export default AdminPanel;

// src/components/ProductManagement.js
import React, { useState } from 'react';

const ProductManagement = ({ products, onProductUpdate }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleInputChange = (e, productState, setProductState) => {
    setProductState({ ...productState, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    // Simulate API call to add product (replace with your API endpoint)
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((addedProduct) => {
        onProductUpdate([...products, addedProduct]);
        setNewProduct({ name: '', description: '', price: 0, quantity: 0 }); //reset form
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setEditedProduct({ ...product });
  };

  const handleUpdateProduct = () => {
    // Simulate API call to update product (replace with your API endpoint)
    fetch(/api/products/${editProductId}, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        const updatedProducts = products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        onProductUpdate(updatedProducts);
        setEditProductId(null);
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  const handleDeleteProduct = (productId) => {
    // Simulate API call to delete product (replace with your API endpoint)
    fetch(/api/products/${productId}, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        onProductUpdate(updatedProducts);
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h3>Manage Products</h3>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => handleInputChange(e, newProduct, setNewProduct)}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => handleInputChange(e, newProduct, setNewProduct)}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => handleInputChange(e, newProduct, setNewProduct)}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={(e) => handleInputChange(e, newProduct, setNewProduct)}
      />
      <button onClick={handleAddProduct}>Add Product</button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editProductId === product.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)}
                />
                <input
                  type="text"
                  name="description"
                  value={editedProduct.description}
                  onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)}
                />
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)}
                />
                <input
                  type="number"
                  name="quantity"
                  value={editedProduct.quantity}
                  onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)}
                />
                <button onClick={handleUpdateProduct}>Update</button>
                <button onClick={() => setEditProductId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {product.name} - ${product.price} - Qty: {product.quantity}
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;

// src/components/TransactionMonitoring.js
import React from 'react';

const TransactionMonitoring = ({ transactions }) => {
  return (
    <div>
      <h3>Transaction Monitoring</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            Transaction ID: {transaction.id} - Total: ${transaction.total} - Date: {transaction.date}
            {/* Add more transaction details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionMonitoring;
product.id
