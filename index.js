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
    const { username, fullname, email, balance, mobile ,accountNo} = user;
    res.json({ success: true, profile: { username, fullname, email, balance, mobile , accountNo} });
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

app.post('/api/add-beneficiary', (req, res) => {
  const { fullname, accountNo } = req.body;

  if (!fullname || !accountNo) {
    return res.status(400).json({ success: false, message: 'fullname and accountNo are required.' });
  }
// I am not validating the account number and full name
  const filePath = path.join(__dirname, 'beneficiary.json');

  // Read existing data
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ success: false, message: 'Failed to read beneficiary file.' });
    }

    let beneficiaries = [];

    try {
      beneficiaries = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).json({ success: false, message: 'Failed to parse beneficiary data.' });
    }

    // Add new beneficiary
    const newBeneficiary = { fullname, accountNo };
    beneficiaries.push(newBeneficiary);

    // Write updated data
    fs.writeFile(filePath, JSON.stringify(beneficiaries, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
        return res.status(500).json({ success: false, message: 'Failed to write beneficiary file.' });
      }

      res.status(201).json({ success: true, message: 'Beneficiary added successfully.' });
    });
  });
});


const PORT = process.env.PORT || 1626;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});