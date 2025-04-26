import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-blue-800 text-white">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Fast, Reliable, and Professional Transportation Solutions
          </h1>
          <p className="text-md sm:text-lg mb-8">
            Whether it's freight, logistics, or passenger transport, we've got you covered with safe, efficient services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/booking">
              <button className="bg-white text-blue-800 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition">
                Book a Service
              </button>
            </Link>
            <a href="#services">
              <button className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-blue-800 transition">
                Learn More
              </button>
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img src="/assets/hero-image.avif" alt="Transportation Hero" className="rounded-lg shadow-lg w-full max-w-md" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-4">Freight Transport</h3>
            <p className="text-gray-600">
              Secure, on-time freight delivery services for businesses of all sizes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-4">Passenger Transport</h3>
            <p className="text-gray-600">
              Comfortable and reliable passenger services for individuals and corporate clients.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-4">Logistics Solutions</h3>
            <p className="text-gray-600">
              Comprehensive logistics management tailored to your needs and timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials / Trust Section */}
      <section className="bg-blue-50 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-12">
          Trusted by Companies Nationwide
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-10">
          <img src="/assets/clients/logo1.svg" alt="Client 1" className="h-12" />
          <img src="/assets/clients/logo2.svg" alt="Client 2" className="h-12" />
          <img src="/assets/clients/logo3.svg" alt="Client 3" className="h-12" />
          <img src="/assets/clients/logo4.svg" alt="Client 4" className="h-12" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 text-white py-16 px-6 md:px-20 flex flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold mb-6">
          Ready to Get Moving?
        </h2>
        <p className="text-md sm:text-lg mb-8">
          Contact us today and experience world-class transportation services you can trust.
        </p>
        <Link to="/contact">
          <button className="bg-white text-blue-800 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition">
            Contact Us
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-100 text-gray-600 mt-auto">
        &copy; {new Date().getFullYear()} TransMove Logistics. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
