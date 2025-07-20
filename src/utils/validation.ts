import { ApiError } from './api-client';

/**
 * Validate and format parameters for API calls using Temporal API
 * Throws ApiError if parameters are invalid
 */
export function validateApiParams(
  params: Record<string, unknown>
): Record<string, unknown> {
  const validatedParams = { ...params };

  // Validate page parameter if it exists
  if (validatedParams.page) {
    try {
      const page = parseInt(String(validatedParams.page));

      if (isNaN(page)) {
        throw new ApiError(
          400,
          `Invalid page parameter: ${validatedParams.page} is not a valid number`
        );
      }

      if (page < 1) {
        throw new ApiError(
          400,
          `Invalid page parameter: ${page} must be greater than 0`
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        400,
        `Invalid page parameter: ${validatedParams.page}`
      );
    }
  }

  // Validate year parameter if it exists
  if (validatedParams.year) {
    try {
      const year = parseInt(String(validatedParams.year));
      const currentYear = Temporal.Now.plainDateISO().year;

      if (isNaN(year)) {
        throw new ApiError(
          400,
          `Invalid year parameter: ${validatedParams.year} is not a valid number`
        );
      }

      if (year < 1900 || year > currentYear) {
        throw new ApiError(
          400,
          `Invalid year parameter: ${year} must be between 1900 and ${currentYear}`
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        400,
        `Invalid year parameter: ${validatedParams.year}`
      );
    }
  }

  // Validate rating parameter if it exists
  if (validatedParams['vote_average.gte']) {
    try {
      const rating = parseFloat(String(validatedParams['vote_average.gte']));

      if (isNaN(rating)) {
        throw new ApiError(
          400,
          `Invalid rating parameter: ${validatedParams['vote_average.gte']} is not a valid number`
        );
      }

      if (rating < 0 || rating > 10) {
        throw new ApiError(
          400,
          `Invalid rating parameter: ${rating} must be between 0 and 10`
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        400,
        `Invalid rating parameter: ${validatedParams['vote_average.gte']}`
      );
    }
  }

  // Validate genre parameter if it exists
  if (validatedParams.with_genres) {
    const genres = String(validatedParams.with_genres).split(',');

    for (const genre of genres) {
      const genreId = parseInt(genre.trim());
      if (isNaN(genreId) || genreId <= 0) {
        throw new ApiError(
          400,
          `Invalid genre parameter: ${genre} is not a valid genre ID`
        );
      }
    }
  }

  return validatedParams;
}
