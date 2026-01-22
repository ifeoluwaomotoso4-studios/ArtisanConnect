
import { Artisan, Review } from '../types';

const ARTISANS_KEY = 'artisanconnect_artisans';
const REVIEWS_KEY = 'artisanconnect_reviews';
const CURRENT_USER_KEY = 'artisanconnect_current_user';

export const db = {
  getArtisans: (): Artisan[] => {
    const data = localStorage.getItem(ARTISANS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveArtisan: (artisan: Artisan): boolean => {
    const artisans = db.getArtisans();
    if (artisans.some(a => a.businessName.toLowerCase() === artisan.businessName.toLowerCase())) {
      return false;
    }
    artisans.push(artisan);
    localStorage.setItem(ARTISANS_KEY, JSON.stringify(artisans));
    return true;
  },

  getReviews: (artisanId?: string): Review[] => {
    const data = localStorage.getItem(REVIEWS_KEY);
    const reviews: Review[] = data ? JSON.parse(data) : [];
    if (artisanId) {
      return reviews.filter(r => r.artisanId === artisanId);
    }
    return reviews;
  },

  addReview: (review: Review) => {
    const reviews = db.getReviews();
    reviews.unshift(review); // Newest first
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  },

  login: (businessName: string, password: string): Artisan | null => {
    const artisans = db.getArtisans();
    const found = artisans.find(
      a => a.businessName === businessName && a.password === password
    );
    if (found) {
      const { password: _, ...userWithoutPassword } = found;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      return found;
    }
    return null;
  },

  getCurrentUser: (): Artisan | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
