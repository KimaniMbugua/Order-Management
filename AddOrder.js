import React, { useState } from 'react';
import axios from 'axios';
import './AddOrder.css';

const AddOrder = () => {
  const [formData, setFormData] = useState({
    CustomerName: '',
    Item: '',
    OrderedDate: '',
    PaymentStatus: 'Pending',
    Price: 0, // Initialize Price to 0
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Define price mapping based on items
  const priceMapping = {
    "Rambutan Juice": 12500,
    "Papaya Lime Juice": 23500,
    "Bali Orange Juice": 20500,
    "Jackfruit Smoothie": 17500,
    "Cempedak Juice": 16800,
    "Duku Juice": 14200,
    "Kedondong Juice": 12900,
    "Java Apple Juice": 17700,
    "Tamarillo Juice": 10600,
    "Ambarella Juice": 16400,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Automatically set the price based on the selected item
    if (name === 'Item') {
      const price = priceMapping[value] || 0; // Default to 0 if the item is not in the mapping
      setFormData({ ...formData, [name]: value, Price: price });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      // Log form data for debugging
      console.log('Submitting order:', formData);

      // Make API call
      const response = await axios.post('http://localhost:5000/order', formData);

      // Handle successful response
      console.log('Response:', response.data);
      setMessage('Order added successfully!');
      setError('');

      // Reset form fields
      setFormData({
        CustomerName: '',
        Item: '',
        OrderedDate: '',
        PaymentStatus: 'Pending',
        Price: 0, // Reset Price
      });
    } catch (error) {
      // Handle error response
      console.error('Error adding order:', error);
      setError('Failed to add order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Order</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="CustomerName"
            value={formData.CustomerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Item:</label>
          <select
            name="Item"
            value={formData.Item}
            onChange={handleChange}
            required
          >
            <option value="">Select an item</option>
            {Object.keys(priceMapping).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Ordered Date:</label>
          <input
            type="date"
            name="OrderedDate"
            value={formData.OrderedDate}
            onChange={handleChange}
            required
          />
        </div>
        <p>
          <strong>Price:</strong> ${formData.Price}
        </p>
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};

export default AddOrder;
