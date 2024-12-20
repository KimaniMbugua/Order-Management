const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to original name
  },
});
const upload = multer({ storage });

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'OM',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and Password are required' });
  }
  const query = 'SELECT * FROM User WHERE Username = ? AND Password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).send({ message: 'Server error during login' });
    }
    if (results.length === 0) {
      return res.status(401).send({ message: 'Invalid Username or Password' });
    }
    res.status(200).send({ message: 'Login successful', user: results[0] });
  });
});

// Add Payment route
app.post('/payment', upload.single('PaymentProof'), (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  const { OrderID, Amount, PaymentDate } = req.body;
  const PaymentProof = req.file ? req.file.filename : null;

  if (!OrderID || !Amount || !PaymentDate) {
    console.error('Missing required fields:', { OrderID, Amount, PaymentDate });
    return res.status(400).send({ message: 'OrderID, Amount, and PaymentDate are required.' });
  }

  const query = 'INSERT INTO `payment` (OrderID, Amount, PaymentDate, PaymentProof) VALUES (?, ?, ?, ?)';
  connection.query(query, [OrderID, Amount, PaymentDate, PaymentProof], (err, result) => {
    if (err) {
      console.error('Error adding payment:', err);
      res.status(500).send({ message: 'Error adding payment' });
    } else {
      res.status(201).send({ message: 'Payment added successfully', paymentId: result.insertId });
    }
  });
});


//Route to add orders
app.post('/order', (req, res) => {
  const { CustomerName, Item, Price, OrderedDate, PaymentStatus } = req.body;

  if (!CustomerName || !Item || !Price || !OrderedDate) {
    console.log('Validation failed: Missing fields.');
    return res.status(400).send({ message: 'All fields are required.' });
  }

  const query = 'INSERT INTO `order` (CustomerName, Item, Price, OrderedDate, PaymentStatus) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [CustomerName, Item, Price, OrderedDate, PaymentStatus], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log detailed error
      res.status(500).send({ message: 'Database error', error: err });
    } else {
      res.status(201).send({ message: 'Order created successfully', orderId: result.insertId });
    }
  });
});

// Fetch all orders
app.get('/orders', (req, res) => {
  const query = 'SELECT * FROM `order`';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).send('Error fetching orders');
    }
    res.status(200).send(results);
  });
});

// Update order with PaymentStatus and Item
app.put('/order/update', (req, res) => {
  const { OrderID, PaymentStatus, Item } = req.body;

  console.log('Update data received:', { OrderID, PaymentStatus, Item });

  if (!OrderID || (!PaymentStatus && !Item)) {
    return res.status(400).send({ message: 'OrderID and at least one field (PaymentStatus or Item) are required' });
  }

  const query = 'UPDATE `order` SET PaymentStatus = ?, Item = ? WHERE OrderID = ?';
  connection.query(query, [PaymentStatus || null, Item || null, OrderID], (err, result) => {
    if (err) {
      console.error('Error updating order:', err);
      return res.status(500).send({ message: 'Error updating order' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.status(200).send({ message: 'Order updated successfully' });
  });
});

// Delete order
app.delete('/order/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM `order` WHERE OrderID = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting order:', err);
      return res.status(500).send('Error deleting order');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send({ message: 'Order deleted successfully' });
  });
});

// Add a new user
app.post('/user', (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res.status(400).send({ message: 'Username and Password are required' });
  }
  const query = 'INSERT INTO User (Username, Password) VALUES (?, ?)';
  connection.query(query, [Username, Password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send({ message: 'Username already exists' });
      }
      console.error('Error inserting user:', err);
      return res.status(500).send({ message: 'Error adding user' });
    }
    res.status(201).send({ message: 'User added successfully', userId: result.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
