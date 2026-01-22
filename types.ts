
export interface Artisan {
  id: string;
  businessName: string;
  specialization: string;
  location: string;
  portfolioImages: string[]; // Base64 strings
  password?: string;
}

export interface Review {
  id: string;
  artisanId: string;
  author: string;
  comment: string;
  timestamp: number;
}

export type Specialization = 
  | 'Plumber' 
  | 'Fashion Designer' 
  | 'Carpenter' 
  | 'Electrician' 
  | 'Painter' 
  | 'Mason' 
  | 'Tailor' 
  | 'Caterer' 
  | 'Other';

export const SPECIALIZATIONS: Specialization[] = [
  'Plumber',
  'Fashion Designer',
  'Carpenter',
  'Electrician',
  'Painter',
  'Mason',
  'Tailor',
  'Caterer',
  'Other'
];
