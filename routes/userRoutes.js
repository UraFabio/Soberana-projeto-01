const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.get('/', userController.getUser);

router.post('/createAccount', userController.createAccount);

router.delete('/deleteAccount', userController.deleteAccount);

module.exports = router;
