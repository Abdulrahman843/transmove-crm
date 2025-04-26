// server/routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const { submitContactMessage } = require('../controllers/contactController'); // 👈 Correct controller

// Submit contact message
router.post('/', submitContactMessage);

module.exports = router;
