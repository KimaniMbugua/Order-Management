import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [updateForm, setUpdateForm] = useState({ OrderID: '', PaymentStatus: 'Pending', Item: '' });
  const [updateMessage, setUpdateMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({ ...updateForm, [name]: value });
  };

  // Handle form submission to update PaymentStatus and Item
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/order/update', updateForm);
      setUpdateMessage(response.data.message);
      setUpdateForm({ OrderID: '', PaymentStatus: 'Pending', Item: '' });

      // Refresh the order list after the update
      const updatedOrders = await axios.get('http://localhost:5000/orders');
      setOrders(updatedOrders.data);
    } catch (error) {
      console.error('Error updating order:', error);
      setUpdateMessage('Error updating order');
    }
  };

  // Handle delete order
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/order/${orderId}`);
      setDeleteMessage(response.data.message);

      // Refresh the order list after deletion
      const updatedOrders = await axios.get('http://localhost:5000/orders');
      setOrders(updatedOrders.data);
    } catch (error) {
      console.error('Error deleting order:', error);
      setDeleteMessage('Error deleting order');
    }
  };

  return (
    <div className="order-list-container">
      <h2>Order List</h2>
      {error && <p className="error-message">{error}</p>}
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Item</th>
              <th>Price</th>
              <th>Ordered Date</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.OrderID}>
                <td>{order.OrderID}</td>
                <td>{order.CustomerName}</td>
                <td>{order.Item}</td>
                <td>{order.Price}</td>
                <td>{order.OrderedDate}</td>
                <td>{order.PaymentStatus}</td>
                <td>
                  <button
                    onClick={() => handleDeleteOrder(order.OrderID)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="update-payment-form">
        <h3>Update Order</h3>
        {updateMessage && <p className="update-message">{updateMessage}</p>}
        <form onSubmit={handleUpdateSubmit}>
          <div>
            <label>Order ID:</label>
            <input
              type="text"
              name="OrderID"
              value={updateForm.OrderID}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label>Item:</label>
            <input
              type="text"
              name="Item"
              value={updateForm.Item}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>Payment Status:</label>
            <select
              name="PaymentStatus"
              value={updateForm.PaymentStatus}
              onChange={handleFormChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <button type="submit">Update Order</button>
        </form>
      </div>
    </div>
  );
};

export default OrderList;
