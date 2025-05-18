'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // URL'de q parametresi yoksa arama alanını temizle
  useEffect(() => {
    if (!searchParams.get('q')) {
      setQuery('');
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    if (searchParams.get('q')) {
      // Eğer aktif bir arama varsa, anasayfaya dön
      setQuery('');
      router.push('/');
    } else {
      // Sadece input alanını temizle
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Haber ara..."
          className="w-full px-4 py-2 pl-10 pr-10 text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Temizle"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar; 