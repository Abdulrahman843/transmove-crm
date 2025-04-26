import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-6xl font-bold text-blue-800 mb-6">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Oops! Page not found.
      </h2>
      <p className="text-gray-500 mb-8 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="bg-blue-800 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-900 transition">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
