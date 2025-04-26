// server/controllers/bookingController.js

const Booking = require('../models/Booking');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Create Booking Error:', err);
    res.status(400).json({ message: 'Booking failed', error: err.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Get All Bookings Error:', err);
    res.status(500).json({ message: 'Fetching bookings failed', error: err.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Admin
const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: 'Booking status updated successfully', booking });
  } catch (err) {
    console.error('Update Booking Status Error:', err);
    res.status(400).json({ message: 'Status update failed', error: err.message });
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Admin
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Delete Booking Error:', err);
    res.status(500).json({ message: 'Delete booking failed', error: err.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
};
