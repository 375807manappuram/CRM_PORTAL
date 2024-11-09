import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth'; // Import useAuth to get user data
import axios from 'axios'; // Import Axios
import '../styles/incident.css';

const Incident = () => {
    const [auth] = useAuth(); // Get user data from auth context
    const [customerData, setCustomerData] = useState({
        id: auth.user.id || null,
        name: auth.user.name || '',
        email: auth.user.email || '',
        phno: auth.user.phno || ''
    });
    const [complaint, setComplaint] = useState('');
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Set loading to false initially

    useEffect(() => {
        // Check if user data is available
        if (auth.user) {
            setCustomerData({
                id: auth.user.id,
                name: auth.user.name,
                email: auth.user.email,
                phno: auth.user.phno
            });
        } else {
            setError('User data is not available.');
        }
    }, [auth.user]);

    const handleChange = (e) => {
        setComplaint(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!complaint) {
            setError('Complaint cannot be empty!');
            return;
        }

        const requestBody = {
            cust_id: customerData.id,
            cust_Name: customerData.name,
            email: customerData.email,
            phone: customerData.phno,
            reason: complaint
        };

        try {
            const response = await axios.post('https://localhost:7294/API/GeneratTicket', requestBody);
            if (response.data.status.code === 1) {
                setTicket(response.data.status.message); // Store the success message
                setComplaint(''); // Clear the complaint input
                setError(''); // Clear any previous errors
            } else {
                setError('Failed to submit complaint: ' + response.data.status.message);
            }
        } catch (error) {
            setError('Failed to submit complaint: ' + error.message);
        }
    };

    return (
        <div className="complaints-form">
            <h2>Register a Complaint</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={customerData.name} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={customerData.email} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="phno">Phone Number:</label>
                    <input type="text" id="phno" value={customerData.phno} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="complaint">Complaint:</label>
                    <textarea id="complaint" value={complaint} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {ticket && (
                <div className="ticket-message">
                    <h3>Your Complaint Ticket has been generated!</h3>
                    <p>{ticket}</p> {/* Display the success message */}
                </div>
            )}
        </div>
    );
};

export default Incident;
