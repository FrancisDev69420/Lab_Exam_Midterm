import React, { useEffect, useState } from "react";
import api from "../../api";
import { Modal, Button, Form, Table } from "react-bootstrap";

const ProductList = () => {
    // State to hold the list of products
    const [products, setProducts] = useState([]);

    // State for showing/hiding the modal
    const [showModal, setShowModal] = useState(false);

    // State for the product being edited
    const [isEditing, setIsEditing] = useState(false);

    // State for the product form data
    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
    });

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Run fetchProducts when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setProductForm({ ...productForm, [name]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Create a FormData object to send the form data as multipart/form-data
        const formData = new FormData();

        // Append each field in the productForm state to the FormData object
        for (const key in productForm) {
            formData.append(key, productForm[key]);
        }

        try {
            if (isEditing) {
                // If editing, send a PUT request to update the product
                await api.put(`/products/${productForm.id}`, formData);
            } else {
                // If adding a new product, send a POST request
                await api.post("/products", formData);
            }
            setShowModal(false);
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

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

    const handleEdit = (product) => {
        // Set the product data to the form state for editing
        setProductForm(product);
        // Set the editing state to true
        setIsEditing(true);
        // Show the modal
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Product List</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Product
            </Button>
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
                    {products.map((product) => (
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
                                >
                                    Edit
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for adding/editing products */}
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
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleInputChange}
                            />
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
