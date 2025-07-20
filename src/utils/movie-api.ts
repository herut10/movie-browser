import type {
  Movie,
  MovieDetail,
  ApiResponse,
  MovieSearchParams,
} from '@/types/movie';
import { fetchApi } from './api-client';
import { validateApiParams } from './validation';

export async function searchMovies(
  params: MovieSearchParams
): Promise<ApiResponse<Movie>> {
  const validatedParams = validateApiParams(params as Record<string, unknown>);

  // If no query is provided, use discover endpoint instead
  if (!validatedParams.query) {
    // Add default sort for discover endpoint to get popular movies
    const discoverParams = { ...validatedParams, sort_by: 'popularity.desc' };
    return fetchApi<ApiResponse<Movie>>(
      '/discover/movie',
      discoverParams as Record<string, string | number>
    );
  }

  return fetchApi<ApiResponse<Movie>>(
    '/search/movie',
    validatedParams as Record<string, string | number>
  );
}

export async function discoverMovies(
  params: MovieSearchParams
): Promise<ApiResponse<Movie>> {
  const validatedParams = validateApiParams(params as Record<string, unknown>);
  return fetchApi<ApiResponse<Movie>>(
    '/discover/movie',
    validatedParams as Record<string, string | number>
  );
}

export async function getMovieDetails(movieId: number): Promise<MovieDetail> {
  return fetchApi<MovieDetail>(`/movie/${movieId}`, {
    append_to_response: 'credits',
  });
}

export async function getGenres(): Promise<{
  genres: Array<{ id: number; name: string }>;
}> {
  return fetchApi<{ genres: Array<{ id: number; name: string }> }>(
    '/genre/movie/list'
  );
}
