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
        <SearchBar />
      </div>
      <div className="mb-12">
        <CategoryFilter />
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
