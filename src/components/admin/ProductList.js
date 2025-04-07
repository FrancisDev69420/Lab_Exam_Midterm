import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

const API_BASE_URL = "http://localhost:8000/api"; // Adjust base URL if needed

const ProductList = () => {
  // State for storing all products
  const [products, setProducts] = useState([]);

  // Modal visibility control
  const [showModal, setShowModal] = useState(false);

  // Flag for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Form data for creating/updating a product
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  // Fetch products from backend API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setProducts(data); // Save fetched products in state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products once component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes for both text and file inputs
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setProductForm({ ...productForm, [name]: files ? files[0] : value });
  };

  // Handle form submission for adding/updating a product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission (including image upload)
    const formData = new FormData();
    for (const key in productForm) {
      formData.append(key, productForm[key]);
    }

    try {
      const token = localStorage.getItem("token"); // Get token for auth

      const response = await fetch(
        `${API_BASE_URL}/products${isEditing ? `/${productForm.id}` : ""}`,
        {
          method: "POST", // Change to PUT if needed for editing
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      // Close modal, refresh products, and reset form
      setShowModal(false);
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    });
    setIsEditing(false);
  };

  // Populate form with selected product data and show modal for editing
  const handleEdit = (product) => {
    setProductForm(product);
    setIsEditing(true);
    setShowModal(true);
  };

  // Delete a product by ID
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Product List</h2>

      {/* Add Product Button */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Product
      </Button>

      {/* Product Table */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(product)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Product */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Product" : "Add Product"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={productForm.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={productForm.stock}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleInputChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ProductList;
