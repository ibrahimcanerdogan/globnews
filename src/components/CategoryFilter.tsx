'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/config/api';

function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'general') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              currentCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter; 