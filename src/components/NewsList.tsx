'use client';

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { newsService, type NewsArticle } from '@/services/newsService';
import { Category } from '@/config/api';

function NewsList() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const category = searchParams.get('category') as Category | null;

  const { data, error, isLoading } = useSWR(
    ['news', category, query],
    async () => {
      try {
        console.log('Fetching news with:', { query, category });
        if (query) {
          const result = await newsService.searchNews(query);
          console.log('Search result:', result);
          return result;
        }
        const result = await newsService.getTopHeadlines(category || undefined);
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.articles.map((article: NewsArticle) => (
        <article
          key={article.url}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {article.urlToImage && (
            <div className="relative h-48">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-image.jpg';
                }}
              />
            </div>
          )}
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
  );
}

export default NewsList; 