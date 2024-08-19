const express = require('express');
const path = require('path');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.get('/', authController.protect, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});
module.exports = router;
