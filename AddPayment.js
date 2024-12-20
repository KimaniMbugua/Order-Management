import React, { useState } from 'react';
import axios from 'axios';
import './AddPayment.css';

const AddPayment = () => {
  const [paymentData, setPaymentData] = useState({
    OrderID: '',
    Amount: '',
    PaymentDate: '',
  });
  const [file, setFile] = useState(null); // State to hold the selected file
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('OrderID', paymentData.OrderID);
    formData.append('Amount', paymentData.Amount);
    formData.append('PaymentDate', paymentData.PaymentDate);
    if (file) {
      formData.append('PaymentProof', file); // Add the file only if it's provided
    }

    try {
      const response = await axios.post('http://localhost:5000/payment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message || 'Payment added successfully!');
      setPaymentData({ OrderID: '', Amount: '', PaymentDate: '' });
      setFile(null);
    } catch (error) {
      console.error('Error:', error.response || error.message);
      setError(error.response?.data?.message || 'Failed to add payment. Please try again.');
    }
  };

  return (
    <div className="add-payment-container">
      <h2>Add Payment</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID:</label>
          <input
            type="text"
            name="OrderID"
            value={paymentData.OrderID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="Amount"
            value={paymentData.Amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Payment Date:</label>
          <input
            type="date"
            name="PaymentDate"
            value={paymentData.PaymentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Payment Proof (Optional):</label>
          <input
            type="file"
            name="PaymentProof"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit">Add Payment</button>
      </form>
    </div>
  );
};

export default AddPayment;
