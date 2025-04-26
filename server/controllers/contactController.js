// server/controllers/contactController.js

const Contact = require('../models/Contact');

// @desc Submit a new contact message
// @route POST /contacts
// @access Public
const submitContactMessage = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({
      message: 'Failed to submit contact message',
      error: err.message,
    });
  }
};

module.exports = {
  submitContactMessage,
};
