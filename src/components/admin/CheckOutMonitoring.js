import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:8000'; // Your backend URL

const CheckoutMonitoring = () => {
    // State to store fetched checkout data
    const [checkout, setCheckOuts] = useState([]);
    
    // State to control modal visibility
    const [showModal, setShowModal] = useState(false);
    
    // Stores the selected checkout to be viewed in the modal
    const [selectedCheckout, setSelectedCheckout] = useState(null);
    
    // Stores the selected date for filtering checkouts
    const [filterDate, setFilterDate] = useState('');

    // Fetch checkouts from the API when the component mounts or filterDate changes
    useEffect(() => {
        const fetchCheckouts = async () => {
            // Use filtered endpoint if a date is selected
            let url = `${API_BASE_URL}/api/checkouts`; 
            if (filterDate) {
                url = `${API_BASE_URL}/api/checkouts/filter/${filterDate}`;
            }

            try {
                // Send GET request to fetch checkouts
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                // Update state if request is successful
                if (response.ok) {
                    const data = await response.json();
                    setCheckOuts(data);
                } else {
                    console.error('Failed to fetch checkouts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching checkouts:', error);
            }
        };

        fetchCheckouts();
    }, [filterDate]); // Re-fetch when filterDate changes

    // Function to show modal and set selected checkout
    const viewCheckout = (checkout) => {
        setSelectedCheckout(checkout);
        setShowModal(true);
    };

    return (
        <div className="container mt-5">
            <h2>Checkout Monitoring</h2>

            {/* Filter by Date Input */}
            <Form.Group controlId="filterDate" className="mb-3">
                <Form.Label>Filter by Date</Form.Label>
                <Form.Control
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </Form.Group>

            {/* Table displaying list of checkouts */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Total Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {checkout.map((checkout) => (
                        <tr key={checkout.id}>
                            <td>{checkout.id}</td>
                            <td>{checkout.customer}</td>
                            <td>{checkout.total_price}</td>
                            <td>{new Date(checkout.created_at).toLocaleString()}</td>
                            <td>
                                <Button variant="info" onClick={() => viewCheckout(checkout)}>
                                    View
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal to show selected checkout details */}
            {selectedCheckout && (
                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Checkout Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedCheckout && (
                            <>
                                <p><strong>Customer:</strong> {selectedCheckout.customer}</p>
                                <p><strong>Date:</strong> {new Date(selectedCheckout.created_at).toLocaleString()}</p>
                                <hr />
                                <h6>Items:</h6>
                                <ul>
                                    {selectedCheckout.items.map((item, index) => (
                                        <li key={index}>
                                            {item.product_name} — {item.quantity} x ₱{item.price}
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                                <p><strong>Total:</strong> ₱{selectedCheckout.total_price}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Button to go back to the previous page (product list) */}
            <Button variant="secondary" onClick={() => window.history.back()} className="mt-4">
                Back To Product List
            </Button>
        </div>
    );
};

export default CheckoutMonitoring;
