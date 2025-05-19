import { Suspense } from 'react';
import NewsList from '@/components/NewsList';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <Link 
            href="/" 
            className="text-4xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
          >
            GlobNews
          </Link>
        </div>
        
        <div className="mb-10">
          <SearchBar />
        </div>

        <div className="mb-10">
          <CategoryFilter />
        </div>

        <Suspense fallback={
          <div className="flex justify-center items-center py-12">
            <div className="text-white text-lg font-medium">Yükleniyor...</div>
          </div>
        }>
          <NewsList />
        </Suspense>
      </div>
    </main>
  );
}
