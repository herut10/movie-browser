export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  original_language: string;
  original_title: string;
};

export type MovieDetail = {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  credits: Credits;
} & Movie;

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
};

export type Credits = {
  cast: CastMember[];
  crew: CrewMember[];
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
};

export type SearchFilters = {
  query: string;
  year: string;
  rating: string;
  genre: string[];
};

export type ApiResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type MovieSearchParams = {
  query?: string;
  page?: number;
  year?: string;
  'vote_average.gte'?: string;
  'vote_average.lte'?: string;
  with_genres?: string;
};
