
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../services/db';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = db.login(formData.businessName, formData.password);
    if (user) {
      navigate('/');
      window.location.reload();
    } else {
      setError('Invalid business name or password. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-royalBlue rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
            AC
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500">Access your artisan profile and reviews</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Business Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royalBlue focus:outline-none"
              placeholder="Your registered business name"
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royalBlue focus:outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button 
            type="submit" 
            className="w-full py-4 bg-royalBlue text-white font-bold rounded-xl shadow-lg hover:bg-blue-900 transition-all"
          >
            Log In
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an artisan account? <Link to="/register" className="text-royalBlue font-bold hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
