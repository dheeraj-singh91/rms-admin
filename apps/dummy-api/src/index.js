const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;
const dataFile = path.join(__dirname, '../data/data.json');

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

const readData = () => {
  const rawData = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

app.post('/auth/getToken', (req, res) => {
  const { username, accesskey } = req.body;
  let tokenKey = 'accessTokenVm';
  if (accesskey === 'accessSrms') tokenKey = 'accessTokenSrms';
  if (accesskey === 'accessOams') tokenKey = 'accessTokenOams';

  res.json({
    [tokenKey]: 'mock-access-token',
    saltkey: 'mock-salt-key-123',
    success: true,
    msg: 'Token generated',
  });
});

app.post('/auth/validateUser', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const data = readData();
  const userData = data.users.admin;

  res.json({ ...userData, success: true });
});

app.post('/auth/sendOtp', (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  
  res.json({
    otp: data.otp,
    otpValidity: 180,
    success: true,
  });
});

app.post('/auth/verifyOtp', (req, res) => {
  const { otp } = req.body;
  const data = readData();

  if (otp !== data.otp) {
    return res.status(400).json({ success: false, msg: 'Invalid OTP' });
  }

  res.json({
    success: true,
    desiredScreen: '/dashboard',
    msg: 'Logged in successfully',
  });
});

app.post('/auth/validateToken', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, msg: 'No token provided' });
  }

  res.json({
    success: true,
    desiredScreen: '/dashboard',
  });
});

app.listen(port, () => {
  console.log(`Dummy API server running at http://localhost:${port}`);
});
