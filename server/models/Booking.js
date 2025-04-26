// server/models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Completed'],
    default: 'Pending'
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
