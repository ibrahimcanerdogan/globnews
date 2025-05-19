'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import NewsList from '@/components/NewsList';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 bg-gray-800">
      <div className="flex justify-between items-center mb-10">
        <Link href="/" className="text-4xl font-bold text-white hover:text-blue-400 transition-colors duration-200">
          GlobNews
        </Link>
      </div>
      <div className="mb-12">
        <Suspense fallback={
          <div className="w-full max-w-2xl mx-auto h-10 bg-gray-700 rounded-lg animate-pulse"></div>
        }>
          <SearchBar />
        </Suspense>
      </div>
      <div className="mb-12">
        <Suspense fallback={
          <div className="flex flex-wrap gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-24 h-10 bg-gray-700 rounded-full animate-pulse"></div>
            ))}
          </div>
        }>
          <CategoryFilter />
        </Suspense>
      </div>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      }>
        <NewsList />
      </Suspense>
    </main>
  );
}
