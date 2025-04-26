import React, { useState } from 'react';
import axios from '../axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
      const res = await axios.post('/contacts', formData);
      console.log('Message saved:', res.data);
      toast.success('Message sent successfully! 📩');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center">Contact Us</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-6">
        {/* Fields */}
        {[
          { label: "Full Name", name: "name", type: "text" },
          { label: "Email Address", name: "email", type: "email" },
          { label: "Subject", name: "subject", type: "text" },
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

        {/* Message */}
        <div>
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-800 text-white px-6 py-3 rounded-full font-bold w-full hover:bg-blue-900 transition flex justify-center items-center"
        >
          {loading ? <LoadingSpinner size="small" /> : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
