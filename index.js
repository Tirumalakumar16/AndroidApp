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
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username is required in the request body.',
      });
    }

    const user = users.find(u => u.username === username);

    if (user) {
      const { username, fullname, email, role, mobile } = user;
      return res.status(200).json({
        success: true,
        profile: { username, fullname, email, role, mobile },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error('Error in /api/profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});

// View all users endpoint
app.get('/api/users', (req, res) => {
  try {
    // Ensure users array exists and is an array
    if (!Array.isArray(users)) {
      return res.status(500).json({
        success: false,
        message: 'Users data is corrupted or not available.',
      });
    }

    // Remove sensitive data (e.g., passwords)
    const usersData = users.map(({ password, ...rest }) => rest);

    res.status(200).json(usersData
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});



const PORT = process.env.PORT || 1626;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});