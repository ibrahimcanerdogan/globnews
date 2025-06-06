'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/config/api';
import { useEffect } from 'react';

function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const isSearching = searchParams.get('q') !== null;

  // URL'de kategori parametresi yoksa 'general' olarak ayarla
  useEffect(() => {
    if (!currentCategory && !isSearching) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('category', 'general');
      router.replace(`/?${params.toString()}`);
    }
  }, [currentCategory, isSearching, router, searchParams]);

  const handleCategoryChange = (category: string) => {
    // Eğer arama yapılıyorsa kategori değişikliğini engelle
    if (isSearching) return;

    const params = new URLSearchParams(searchParams.toString());
    if (currentCategory === category) {
      // If clicking the same category, set it to general
      params.set('category', 'general');
      params.set('page', '1');
    } else {
      // If clicking a different category, set it
      params.set('category', category);
      params.set('page', '1');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          disabled={isSearching}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              currentCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }
            ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter; 