<template>
  <v-row class="mb-8">
    <!-- Poster -->
    <v-col cols="12" lg="4">
      <v-img
        :src="movieData.posterUrl"
        :alt="movieData.title"
        class="rounded-lg movie-poster"
        contain
        max-height="600"
      />
    </v-col>

    <!-- Movie Info -->
    <v-col cols="12" lg="8">
      <div class="d-flex align-center mb-4">
        <v-chip color="amber" class="mr-4" prepend-icon="mdi-star">
          {{ movieData.voteAverage.toFixed(1) }}
        </v-chip>
        <span class="text-body-1 text-medium-emphasis mr-4">
          {{ movieData.releaseYear }}
        </span>
        <span v-if="movieData.runtime" class="text-body-1 text-medium-emphasis">
          {{ movieData.runtime }}
        </span>
      </div>

      <div v-if="genresWithSelection.length" class="d-flex flex-wrap mb-4">
        <v-chip
          v-for="genre in genresWithSelection"
          :key="genre.id"
          :variant="genre.isSelected ? 'elevated' : 'outlined'"
          :color="genre.isSelected ? 'success' : 'primary'"
          :class="genre.isSelected ? 'selected-genre mr-2 mb-2' : 'mr-2 mb-2'"
        >
          <v-icon v-if="genre.isSelected" size="16" class="mr-1"
            >mdi-check</v-icon
          >
          {{ genre.name }}
        </v-chip>
      </div>

      <p
        v-if="movieData.tagline"
        class="text-body-1 text-medium-emphasis italic mb-4"
      >
        "{{ movieData.tagline }}"
      </p>

      <div v-if="movieData.overview">
        <h3 class="text-h6 font-weight-medium mb-2">Overview</h3>
        <p class="text-body-1 text-medium-emphasis">
          {{ movieData.overview }}
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMovieStore } from '@/stores/movieStore';
  import { getImageUrl } from '@/utils/image-utils';
  import { getYearFromDate, formatRuntime } from '@/utils/temporal';

  const movieStore = useMovieStore();

  // Computed properties for derived values
  const movieData = computed(() => {
    const movie = movieStore.selectedMovie!;
    return {
      posterUrl: getImageUrl(movie.poster_path, 'w500'),
      title: movie.title,
      voteAverage: movie.vote_average,
      releaseYear: getYearFromDate(movie.release_date),
      runtime: formatRuntime(movie.runtime),
      genres: movie.genres,
      tagline: movie.tagline,
      overview: movie.overview,
    };
  });

  // Computed Set for O(1) genre lookup
  const selectedGenreIds = computed(() => {
    return new Set(movieStore.filters.genre);
  });

  // Computed array of genres with their selection state
  const genresWithSelection = computed(() => {
    if (!movieData.value.genres) return [];

    return movieData.value.genres.map(genre => ({
      ...genre,
      isSelected: selectedGenreIds.value.has(genre.id.toString()),
    }));
  });
</script>

<style scoped lang="scss">
  @use '@/assets/variables.scss' as vars;

  .movie-poster {
    max-height: 600px;
    width: 100%;
    object-fit: contain;
    aspect-ratio: calc(1 / vars.$golden-ratio);
    background: var(--v-theme-surface-variant);
  }

  /* Mobile-first responsive design */
  /* Base styles (mobile) */
  .movie-poster {
    max-height: 400px;
  }

  /* Tablet and up */
  @media (min-width: vars.$breakpoint-tablet) {
    .movie-poster {
      max-height: 500px;
    }
  }

  /* Large screens and up */
  @media (min-width: vars.$breakpoint-large) {
    .movie-poster {
      max-height: 600px;
    }
  }

  /* Selected genre styling */
  .selected-genre {
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
    transition: all 0.2s ease;
  }

  .selected-genre:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
</style>
