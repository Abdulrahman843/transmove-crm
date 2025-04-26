import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import BookingForm from './pages/BookingForm';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage'; // 👉 import 404 page
import Navbar from './components/Navbar';
import BackToTopButton from './components/BackToTopButton';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // only animate once
    });
  }, []);
  
  return (
    <Router>
      <Navbar />  {/* Always visible */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* 👉 this catches wrong URLs */}
      </Routes>
      <BackToTopButton /> {/* Always active */}
    </Router>
  );
}

export default App;
