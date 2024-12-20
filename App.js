import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import OrderList from './OrderList';
import AddOrder from './AddOrder';
import AddPayment from './AddPayment'; // Import AddPayment component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path="/add-payment" element={<AddPayment />} /> {/* AddPayment route */}
      </Routes>
    </Router>
  );
};

export default App;
