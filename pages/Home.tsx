
import React, { useState, useEffect, useMemo } from 'react';
import { Artisan } from '../types';
import { db } from '../services/db';
import ArtisanCard from '../components/ArtisanCard';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artisans, setArtisans] = useState<Artisan[]>([]);

  useEffect(() => {
    setArtisans(db.getArtisans());
  }, []);

  const filteredArtisans = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return artisans.filter(a => 
      a.businessName.toLowerCase().includes(query) ||
      a.location.toLowerCase().includes(query) ||
      a.specialization.toLowerCase().includes(query)
    );
  }, [searchQuery, artisans]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-royalBlue py-16 sm:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">
            Connect with Your <br className="hidden sm:block" /> Neighborhood's Best
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Find trusted plumbers, designers, carpenters, and more right in your community.
          </p>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search by specialty, name, or neighborhood..."
              className="w-full pl-12 pr-4 py-5 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-400/30 shadow-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Artisans</h2>
            <p className="text-gray-500">Discover top-rated talent around you</p>
          </div>
          <span className="text-sm font-medium text-gray-400">{filteredArtisans.length} results</span>
        </div>

        {filteredArtisans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtisans.map(artisan => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">No artisans found</h3>
            <p className="text-gray-500">Try adjusting your search terms or specialization.</p>
          </div>
        )}
      </main>

      {/* App Footer */}
      <footer className="border-t border-gray-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2024 ArtisanConnect. Building community through craftsmanship.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
