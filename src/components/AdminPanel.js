import React, { useState, useEffect } from 'react';
import ProductManagement from './ProductManagement';
import TransactionMonitoring from './TransactionMonitoring';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch initial product data
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));

    // Fetch initial transaction data
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error('Error fetching transactions:', err));
  }, []);

  const handleProductUpdate = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  const handleTransactionUpdate = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel</h2>
      <ProductManagement products={products} onProductUpdate={handleProductUpdate} />
      <hr />
      <TransactionMonitoring transactions={transactions} onTransactionUpdate={handleTransactionUpdate} />
    </div>
  );
};

export default AdminPanel;
