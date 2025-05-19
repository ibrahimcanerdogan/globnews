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

const API_KEY = 'b4984ae3a8ae47549738b33257fe9ca9';
const BASE_URL = 'https://newsapi.org/v2';

export const newsService = {
  async getTopHeadlines(category?: Category, query?: string, page: number = 1, pageSize: number = 9) {
    try {
      let url: string;
      
      if (query) {
        url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${API_KEY}`;
      } else {
        url = `${BASE_URL}/top-headlines?country=us&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}${category ? `&category=${category}` : ''}`;
      }

      console.log('Fetching headlines from:', url);
      const response = await axios.get<NewsResponse>(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Headlines response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch news');
      }
      throw error;
    }
  },

  async searchNews(query: string, page: number = 1, pageSize: number = 9) {
    try {
      const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${API_KEY}`;

      console.log('Searching news from:', url);
      const response = await axios.get<NewsResponse>(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Search response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching news:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to search news');
      }
      throw error;
    }
  },
}; 