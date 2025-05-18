import { Suspense } from 'react';
import NewsList from '@/components/NewsList';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            GlobNews
          </Link>
          <ThemeToggle />
        </div>
        
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="mb-8">
          <CategoryFilter />
        </div>

        <Suspense fallback={<div>Yükleniyor...</div>}>
          <NewsList />
        </Suspense>
      </div>
    </main>
  );
}
