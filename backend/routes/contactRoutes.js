const express = require('express');
const router = express.Router();
const { submitContactMessage, getContactMessages } = require('../controllers/contactController');

router.post('/', submitContactMessage);
router.get('/', getContactMessages);

module.exports = router;
