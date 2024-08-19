const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/login', authController.loginUser);
router.get('/authenticate', authController.protect, (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});

module.exports = router;
