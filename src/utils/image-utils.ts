import {
  PLACEHOLDER_MOVIE,
  PLACEHOLDER_BACKDROP,
  PLACEHOLDER_PROFILE,
} from './placeholders';

export function getImageUrl(
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
): string {
  if (!path) {
    return PLACEHOLDER_MOVIE;
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null,
  size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'
): string {
  if (!path) {
    return PLACEHOLDER_BACKDROP;
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getProfileUrl(
  path: string | null,
  size: 'w45' | 'w185' | 'h632' = 'w185'
): string {
  if (!path) {
    return PLACEHOLDER_PROFILE;
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
