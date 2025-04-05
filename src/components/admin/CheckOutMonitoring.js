import React, { useEffect, useState } from 'react';
import api from '../../api'; // Axios instance
import { Table, Button, Modal, Form } from 'react-bootstrap';

const CheckoutMonitoring = () => {
    const [checkout, setCheckOuts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCheckout, setSelectedCheckout] = useState(null);
    const [filterDate, setFilterDate] = useState('');

    
    const fetchCheckouts = async () => {
        let url = '/checkouts';
        if (filterDate) {
            url += `?date=${filterDate}`;
        }
        try {
            const response = await api.get(url);
            setCheckOuts(response.data);
        } catch (error) {
            console.error('Error fetching checkouts:', error);
        }
    };

    //Fetch checkouts when the component mounts 
    useEffect(() => {
        fetchCheckouts();
    }, [filterDate]);

    const viewCheckout = (checkout) => {
        setSelectedCheckout(checkout);
        setShowModal(true);
    };

    return(
        <div className="container mt-5">
            <h2>Checkout Monitoring</h2>
            <Form.Group controlId="filterDate" className="mb-3">
                <Form.Label>Filter by Date</Form.Label>
                <Form.Control
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </Form.Group>
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
        </div>
    );
    
}
