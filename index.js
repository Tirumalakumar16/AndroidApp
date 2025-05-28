const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [
  {
    username: 'admin',
    password: 'admin123',   
    fullname: 'Tirumala',
    email: 'admin@gmail.com',
    role: 'Admin'
  },
  {
    username: 'ktk',
    password: 'ktk123',
    fullname: 'Tirumala Kumar',
    email: 'ktk@gmail.com',
    role: 'Dev'
  },
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, token: 'dummy-jwt-token', message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// Profile endpoint
app.get('/api/profile', (req, res) => {
  const username = req.query.username;
  const user = users.find(u => u.username === username);

  if (user) {
    res.json({ username: user.username, fullname: user.fullname, email: user.email , role: user.role });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

const PORT = process.env.PORT || 1626;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});