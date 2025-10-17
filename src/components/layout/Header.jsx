import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCreditCard, FiUpload, FiList } from 'react-icons/fi';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-blue-200 transition">
            <FiCreditCard className="text-2xl" />
            <span>CreditDetails</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive('/') 
                  ? 'bg-blue-700 text-white' 
                  : 'hover:bg-blue-700'
              }`}
            >
              <FiCreditCard />
              <span>Home</span>
            </Link>

            <Link
              to="/upload"
              className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive('/upload') 
                  ? 'bg-blue-700 text-white' 
                  : 'hover:bg-blue-700'
              }`}
            >
              <FiUpload />
              <span>Upload Report</span>
            </Link>

            <Link
              to="/reports"
              className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive('/reports') 
                  ? 'bg-blue-700 text-white' 
                  : 'hover:bg-blue-700'
              }`}
            >
              <FiList />
              <span>All Reports</span>
            </Link>
          </nav>

          <div className="md:hidden">
            <button className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;