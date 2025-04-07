import React, { useState } from 'react';

const ProductManagement = ({ products, onProductUpdate }) => {
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, quantity: 0 });
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: '', description: '', price: 0, quantity: 0 });

  const handleInputChange = (e, productState, setProductState) => {
    const { name, value } = e.target;
    setProductState({ ...productState, [name]: value });
  };

  const handleAddProduct = () => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((addedProduct) => {
        onProductUpdate([...products, addedProduct]);
        setNewProduct({ name: '', description: '', price: 0, quantity: 0 });
      })
      .catch((err) => console.error('Error adding product:', err));
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setEditedProduct({ ...product });
  };

  const handleUpdateProduct = () => {
    fetch(`/api/products/${editProductId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedProduct),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        const updatedList = products.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
        onProductUpdate(updatedList);
        setEditProductId(null);
      })
      .catch((err) => console.error('Error updating product:', err));
  };

  const handleDeleteProduct = (productId) => {
    fetch(`/api/products/${productId}`, { method: 'DELETE' })
      .then(() => {
        const updatedList = products.filter((p) => p.id !== productId);
        onProductUpdate(updatedList);
      })
      .catch((err) => console.error('Error deleting product:', err));
  };

  return (
    <div>
      <h4>Manage Products</h4>
      <div>
        <input name="name" placeholder="Name" value={newProduct.name} onChange={(e) => handleInputChange(e, newProduct, setNewProduct)} />
        <input name="description" placeholder="Description" value={newProduct.description} onChange={(e) => handleInputChange(e, newProduct, setNewProduct)} />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={(e) => handleInputChange(e, newProduct, setNewProduct)} />
        <input type="number" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => handleInputChange(e, newProduct, setNewProduct)} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editProductId === product.id ? (
              <>
                <input name="name" value={editedProduct.name} onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)} />
                <input name="description" value={editedProduct.description} onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)} />
                <input type="number" name="price" value={editedProduct.price} onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)} />
                <input type="number" name="quantity" value={editedProduct.quantity} onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)} />
                <button onClick={handleUpdateProduct}>Save</button>
                <button onClick={() => setEditProductId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{product.name}</strong> - ${product.price} | Qty: {product.quantity}
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
