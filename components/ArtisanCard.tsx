
import React, { useState, useEffect } from 'react';
import { Artisan, Review } from '../types';
import { db } from '../services/db';

interface ArtisanCardProps {
  artisan: Artisan;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    setReviews(db.getReviews(artisan.id));
  }, [artisan.id]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !author.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      artisanId: artisan.id,
      author,
      comment,
      timestamp: Date.now()
    };

    db.addReview(newReview);
    setReviews(prev => [newReview, ...prev]);
    setComment('');
    setAuthor('');
    setShowReviews(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Portfolio Images */}
      <div className="grid grid-cols-2 gap-1 h-48 sm:h-56 bg-gray-50">
        {artisan.portfolioImages.map((img, idx) => (
          <div key={idx} className="relative overflow-hidden">
            <img 
              src={img || `https://picsum.photos/400/300?random=${artisan.id}${idx}`} 
              alt={`${artisan.businessName} work ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{artisan.businessName}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-royalBlue border border-blue-100">
            {artisan.specialization}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-1 text-royalBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {artisan.location}
        </div>

        <button 
          onClick={() => setShowReviews(!showReviews)}
          className="text-royalBlue text-sm font-semibold hover:underline flex items-center"
        >
          {showReviews ? 'Hide Reviews' : `View Reviews (${reviews.length})`}
          <svg className={`w-4 h-4 ml-1 transition-transform ${showReviews ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showReviews && (
          <div className="mt-6 space-y-4 animate-fadeIn">
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Comments</h4>
              {reviews.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No reviews yet. Be the first to leave one!</p>
              ) : (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {reviews.map(r => (
                    <div key={r.id} className="bg-gray-50 p-3 rounded-lg text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900">{r.author}</span>
                        <span className="text-[10px] text-gray-400 uppercase">{new Date(r.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3 pt-2">
              <input 
                type="text"
                placeholder="Your Name"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-royalBlue focus:outline-none"
              />
              <textarea 
                placeholder="Share your experience..."
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-royalBlue focus:outline-none resize-none h-20"
              />
              <button 
                type="submit"
                className="w-full py-2 bg-royalBlue text-white text-sm font-bold rounded-lg hover:bg-blue-900 transition-colors"
              >
                Post Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanCard;
