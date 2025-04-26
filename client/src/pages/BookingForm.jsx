import React, { useState } from 'react';
import axios from '../axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/bookings', formData);
      console.log('Booking saved:', res.data);
      toast.success('Booking submitted successfully! 🎉');
      setFormData({
        name: '',
        email: '',
        pickupLocation: '',
        dropoffLocation: '',
        date: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting booking', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center">Book a Transport</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-6">
        {/* Fields */}
        {[
          { label: "Full Name", name: "name", type: "text" },
          { label: "Email Address", name: "email", type: "email" },
          { label: "Pickup Location", name: "pickupLocation", type: "text" },
          { label: "Dropoff Location", name: "dropoffLocation", type: "text" },
          { label: "Travel Date", name: "date", type: "date" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-700 mb-2">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        {/* Special Message */}
        <div>
          <label className="block text-gray-700 mb-2">Special Message</label>
          <textarea
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-800 text-white px-6 py-3 rounded-full font-bold w-full hover:bg-blue-900 transition flex justify-center items-center"
        >
          {loading ? <LoadingSpinner size="small" /> : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
