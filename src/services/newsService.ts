import axios from 'axios';
import { Category } from '@/config/api';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
  message?: string;
}

const api = axios.create({
  baseURL: '/api/news',
});

export const newsService = {
  async getTopHeadlines(category?: Category, query?: string) {
    try {
      const params: Record<string, string> = {};

      if (category) {
        params.category = category;
      }

      if (query) {
        params.q = query;
      }

      console.log('Fetching headlines with params:', params);
      const response = await api.get<NewsResponse>('', { params });
      console.log('Headlines response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  },

  async searchNews(query: string) {
    try {
      const params = {
        q: query,
      };

      console.log('Searching news with params:', params);
      const response = await api.get<NewsResponse>('', { params });
      console.log('Search response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  },
}; 