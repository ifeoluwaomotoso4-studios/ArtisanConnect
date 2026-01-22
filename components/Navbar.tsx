
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../services/db';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = db.getCurrentUser();

  const handleLogout = () => {
    db.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-royalBlue rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-blue-800 transition-colors">
              AC
            </div>
            <span className="text-xl font-bold text-royalBlue tracking-tight">ArtisanConnect</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="text-gray-600 hover:text-royalBlue font-medium transition-colors">Discovery</Link>
            
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-500">Hi, {currentUser.businessName}</span>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-royalBlue border border-royalBlue rounded-lg hover:bg-royalBlue hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-royalBlue"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 text-sm font-semibold text-white bg-royalBlue rounded-lg hover:bg-blue-900 shadow-md transition-all"
                >
                  Join as Artisan
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
