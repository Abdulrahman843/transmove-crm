// server/routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');

// Create a new booking
router.post('/', createBooking);

// Get all bookings
router.get('/', getAllBookings);

// Update booking status
router.put('/:id/status', updateBookingStatus);

// Delete a booking
router.delete('/:id', deleteBooking);

module.exports = router;
