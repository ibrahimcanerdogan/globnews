'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { newsService, type NewsArticle } from '@/services/newsService';
import { Category } from '@/config/api';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

function NewsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const category = searchParams.get('category') as Category | null;
  const pageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const pageSize = 9;
  const prevCategoryRef = useRef(category);
  const [categoryState, setCategory] = useState(category);
  const [queryState, setQuery] = useState(query);

  useEffect(() => {
    if (prevCategoryRef.current !== category) {
      setCurrentPage(1);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      router.push(`?${params.toString()}`);
      prevCategoryRef.current = category;
    }
  }, [category, router, searchParams]);

  useEffect(() => {
    if (category || query) {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (query) params.set('q', query);
      router.push(`/?${params.toString()}`);
    }
  }, [category, query, router]);

  useEffect(() => {
    const categoryParam = searchParams.get('category') as Category;
    const queryParam = searchParams.get('q');
    if (categoryParam) setCategory(categoryParam);
    if (queryParam) setQuery(queryParam);
  }, [searchParams]);

  useEffect(() => {
    if (!category && !query) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('category', 'general');
      router.replace(`?${params.toString()}`);
    }
  }, [category, query, router, searchParams]);

  const { data, error, isLoading } = useSWR(
    ['news', category, query, currentPage],
    async () => {
      try {
        console.log('Fetching news with:', { query, category, page: currentPage });
        if (query) {
          const result = await newsService.searchNews(query, currentPage, pageSize);
          console.log('Search result:', result);
          return result;
        }
        const result = await newsService.getTopHeadlines(category || undefined, undefined, currentPage, pageSize);
        console.log('Headlines result:', result);
        return result;
      } catch (error) {
        console.error('Error in NewsList:', error);
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  const totalPages = data ? Math.ceil(data.totalResults / pageSize) : 0;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    setCurrentPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    console.error('Render error:', error);
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">An error occurred. Please try again later.</p>
        <p className="text-gray-500 text-sm">Error details: {error.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 dark:text-gray-400">Failed to load data.</p>
      </div>
    );
  }

  if (data.status === 'error') {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">API Error</p>
        <p className="text-gray-500 text-sm">{data.message || 'An unknown error occurred.'}</p>
      </div>
    );
  }

  if (!data.articles || data.articles.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 dark:text-gray-400">
          {query ? 'No news found matching your search.' : 'No news found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.articles.map((article: NewsArticle) => (
          <article
            key={article.url}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative w-full h-48">
              <Image
                src={article.urlToImage || '/placeholder.jpg'}
                alt={article.title}
                fill
                className="object-cover rounded-t-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.jpg';
                }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {article.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="truncate max-w-[150px]">{article.source.name}</span>
                <span>
                  {new Date(article.publishedAt).toLocaleDateString('en-US')}
                </span>
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Read More →
              </a>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default NewsList; 