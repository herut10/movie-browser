import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Movie, MovieDetail, SearchFilters } from '@/types/movie';
import { searchMovies, getMovieDetails, getGenres } from '@/utils/movie-api';
import { getYearFromDate } from '@/utils/temporal';

export const useMovieStore = defineStore('movie', () => {
  // State
  const movies = ref<Movie[]>([]);
  const selectedMovie = ref<MovieDetail | null>(null);
  const filters = ref<SearchFilters>({
    query: '',
    year: '',
    rating: '',
    genre: [],
  });
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(0);
  const totalResults = ref(0);
  const genres = ref<Array<{ id: number; name: string }>>([]);

  // Getters
  const filteredMovies = computed(() => {
    if (!filters.value.year) {
      return movies.value;
    }

    const targetYear = parseInt(filters.value.year);
    return movies.value.filter(movie => {
      if (!movie.release_date) return false;
      const movieYear = parseInt(getYearFromDate(movie.release_date));
      return movieYear === targetYear;
    });
  });

  const hasMovies = computed(() => filteredMovies.value.length > 0);
  const hasError = computed(() => error.value !== null);
  const canLoadMore = computed(() => currentPage.value < totalPages.value);
  const hasActiveFilters = computed(() => {
    return (
      filters.value.year || filters.value.rating || filters.value.genre.length
    );
  });

  const fetchMovies = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { year, rating, genre } = filters.value;

      const params: Record<string, string | number> = { page };

      // Add search query if present
      if (filters.value.query) {
        params.query = filters.value.query;
      }

      // Add filters
      if (year) params.year = year;
      if (rating) {
        const ratingNum = parseFloat(rating);
        params['vote_average.gte'] = ratingNum.toString();
      }
      if (genre.length) params.with_genres = genre.join(',');

      const response = await searchMovies(params);

      const {
        results,
        page: responsePage,
        total_pages,
        total_results,
      } = response;

      if (page === 1) {
        movies.value = results;
      } else {
        movies.value.push(...results);
      }

      currentPage.value = responsePage;
      totalPages.value = total_pages;
      totalResults.value = total_results;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch movies';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchMovieDetails = async (movieId: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      const movie = await getMovieDetails(movieId);
      selectedMovie.value = movie;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch movie details';
    } finally {
      isLoading.value = false;
    }
  };

  const selectMovie = async (movieId: number) => {
    // First, try to find the movie in our current list
    const movieFromList = movies.value.find(movie => movie.id === movieId);

    if (movieFromList) {
      // Use the movie from the list immediately for instant display
      selectedMovie.value = movieFromList as MovieDetail;
    }

    // Then fetch the detailed data in the background
    await fetchMovieDetails(movieId);
  };

  const goToPage = async (page: number) => {
    if (page < 1 || page > totalPages.value || isLoading.value) return;

    currentPage.value = page;
    await fetchMovies(page);
  };

  const loadNextPage = async () => {
    if (canLoadMore.value && !isLoading.value) {
      const nextPage = currentPage.value + 1;
      await fetchMovies(nextPage);
    }
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
    currentPage.value = 1;
    fetchMovies();

    // Scroll to top when filters change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    filters.value = {
      query: '',
      year: '',
      rating: '',
      genre: [],
    };
    currentPage.value = 1;
    fetchMovies();

    // Scroll to top when filters are cleared
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchGenres = async () => {
    try {
      const response = await getGenres();
      genres.value = response.genres;
    } catch (err) {
      console.error('Failed to fetch genres:', err);
    }
  };

  return {
    // State
    movies,
    selectedMovie,
    filters,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalResults,
    genres,

    // Getters
    filteredMovies,
    hasMovies,
    hasError,
    canLoadMore,
    hasActiveFilters,

    // Actions
    fetchMovies,
    fetchMovieDetails,
    selectMovie,
    goToPage,
    loadNextPage,
    updateFilters,
    clearFilters,
    fetchGenres,
  };
});
