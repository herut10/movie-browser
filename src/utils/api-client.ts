const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

if (!API_KEY) {
  throw new Error(
    'TMDB API key is required. Please set VITE_TMDB_API_KEY in your .env file.'
  );
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchApi<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API request failed: ${response.statusText}`
    );
  }

  return response.json();
}
