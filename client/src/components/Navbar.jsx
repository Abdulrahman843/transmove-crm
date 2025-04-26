import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-white font-bold border-b-2 border-white'
      : 'text-white hover:text-gray-300';

  return (
    <nav className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <NavLink to="/" className="flex items-center gap-2 font-bold text-2xl" onClick={closeMenu}>
          <img src="/assets/transmove.png" alt="Logo" className="h-8 w-8" />
          TransMove
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/booking" className={navLinkClass} onClick={closeMenu}>
            Booking
          </NavLink>
          <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
            Admin
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col items-center bg-blue-700 py-4 gap-6 md:hidden">
          <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/booking" className={navLinkClass} onClick={closeMenu}>
            Booking
          </NavLink>
          <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
            Admin
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
