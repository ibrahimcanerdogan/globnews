import { NextResponse } from 'next/server';

const API_KEY = 'b4984ae3a8ae47549738b33257fe9ca9';
const BASE_URL = 'https://newsapi.org/v2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '9';
  const endpoint = query ? '/everything' : '/top-headlines';

  try {
    let params: URLSearchParams;
    
    if (query) {
      // For /everything endpoint, use search query and pagination
      params = new URLSearchParams({
        apiKey: API_KEY,
        q: query,
        page,
        pageSize
      });
    } else {
      // For /top-headlines endpoint, use category, country and pagination
      params = new URLSearchParams({
        apiKey: API_KEY,
        country: 'us',
        page,
        pageSize,
        ...(category && { category })
      });
    }

    console.log('Making request to:', `${BASE_URL}${endpoint}?${params}`);
    const response = await fetch(`${BASE_URL}${endpoint}?${params}`);
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    if (data.status === 'error') {
      console.error('News API Error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to fetch news' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
} 