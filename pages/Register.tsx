
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../services/db';
import { SPECIALIZATIONS, Artisan } from '../types';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    businessName: '',
    specialization: SPECIALIZATIONS[0],
    location: '',
    password: '',
  });

  const [images, setImages] = useState<string[]>(['', '']);

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (images.some(img => !img)) {
      setError('Please upload exactly two portfolio images.');
      return;
    }

    setLoading(true);

    const newArtisan: Artisan = {
      id: Date.now().toString(),
      ...formData,
      portfolioImages: images
    };

    const success = db.saveArtisan(newArtisan);

    if (success) {
      // Auto login after registration
      db.login(formData.businessName, formData.password);
      navigate('/');
      window.location.reload();
    } else {
      setError('An artisan with this business name already exists.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Visual Sidebar */}
        <div className="md:w-1/3 bg-royalBlue p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Network</h2>
          <p className="text-blue-100 text-sm">Grow your business by connecting with local clients searching for your expertise.</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
              <span className="text-xs">Showcase Portfolio</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
              <span className="text-xs">Build Trust with Reviews</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="md:w-2/3 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Business Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royalBlue focus:outline-none"
                  placeholder="e.g. Master Woodworks"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Specialization</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royalBlue focus:outline-none appearance-none bg-white"
                    value={formData.specialization}
                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  >
                    {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-royalBlue focus:outline-none"
                    placeholder="Neighborhood, City"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
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

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Portfolio Upload (Exactly 2 Images)</label>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1].map(i => (
                    <div key={i} className={`relative h-32 rounded-xl border-2 border-dashed ${images[i] ? 'border-royalBlue' : 'border-gray-200'} flex items-center justify-center overflow-hidden bg-gray-50 group`}>
                      {images[i] ? (
                        <img src={images[i]} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center">
                          <svg className="mx-auto h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">Image {i+1}</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleImageChange(i, e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-royalBlue text-white font-bold rounded-xl shadow-lg hover:bg-blue-900 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-royalBlue font-bold hover:underline">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
