const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [
  {
    username: 'john',
    password: 'john123',   
    fullname: 'John Deo',
    email: 'johndeo@gmail.com',
    role: 'Admin',
    mobile : '9966332255'
  },
  {
    username: 'ktk',
    password: 'ktk123',
    fullname: 'Tirumala',
    email: 'ktk@gmail.com',
    role: 'Dev',
    mobile : '8855223366'
  },
  {
    username: 'tirumala',
    password: 'tirumala123',
    fullname: 'Tirumala Kumar',
    email: 'tirumala123@gmail.com',
    role: 'Lead',
    mobile : '7744552266'
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
    res.json({ username: user.username, fullname: user.fullname, email: user.email , role: user.role , mobile: user.mobile });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// View all users endpoint
app.get('/api/users', (req, res) => {
  res.json(users);
});



const PORT = process.env.PORT || 1626;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});