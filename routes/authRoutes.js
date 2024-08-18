const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/login', authController.loginUser);
// Outras rotas, como registro ou logout, podem ser adicionadas aqui

module.exports = router;
