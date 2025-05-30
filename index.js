const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'users.json');

function readUsers() {
  const data = fs.readFileSync(usersFile, 'utf8');
  return JSON.parse(data);
}

// const users = [
//   {
//     username: 'john',
//     password: 'john123',   
//     fullname: 'John Deo',
//     email: 'johndeo@gmail.com',
//     role: 'Admin',
//     mobile : '9966332255'
//   },
//   {
//     username: 'ktk',
//     password: 'ktk123',
//     fullname: 'Tirumala',
//     email: 'ktk@gmail.com',
//     role: 'Dev',
//     mobile : '8855223366'
//   },
//   {
//     username: 'tirumala',
//     password: 'tirumala123',
//     fullname: 'Tirumala Kumar',
//     email: 'tirumala123@gmail.com',
//     role: 'Lead',
//     mobile : '7744552266'
//   },
// ];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, token: 'dummy-jwt-token', message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// Profile endpoint
app.post('/api/profile', (req, res) => {
  const { username } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === username);

  if (user) {
    const { username, fullname, email, balance, mobile } = user;
    res.json({ success: true, profile: { username, fullname, email, balance, mobile } });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// View all users endpoint
app.get('/api/users', (req, res) => {
  const users = readUsers();
  const usersData = users.map(({ password, ...rest }) => rest);
  res.json({ usersData });
});

app.post('/api/balance', (req, res) => {
  const { username } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === username);

  if (user) {
    res.json({ success: true, balance: user.balance });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

const PORT = process.env.PORT || 1626;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});