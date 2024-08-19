const express = require('express');
const uploadController = require('./../controllers/uploadController');

const router = express.Router();

router.post(
  '/',
  uploadController.upload.single('file'),
  uploadController.uploadFile
);

router.get('/archives', uploadController.getFiles);

module.exports = router;
