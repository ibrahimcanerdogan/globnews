export const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
export const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export const categories = [
  'general',
  'business',
  'technology',
  'sports',
  'entertainment',
  'health',
  'science'
] as const;

export type Category = typeof categories[number]; 