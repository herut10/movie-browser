<template>
  <v-container v-if="movieStore.selectedMovie">
    <!-- Movie Header -->
    <MovieHeader />

    <!-- Cast Section -->
    <MovieCast />

    <!-- Crew Section -->
    <MovieCrew />

    <!-- Additional Info -->
    <v-row v-if="hasDetails">
      <MovieDetailsInfo />
      <MovieProductionCompanies />
    </v-row>
  </v-container>

  <!-- Loading State -->
  <MovieLoadingState v-else-if="movieStore.isLoading" />

  <!-- Error State -->
  <MovieErrorState
    v-else-if="movieStore.hasError"
    :error="movieStore.error || 'Unknown error occurred'"
  />
</template>

<script setup lang="ts">
  import { watch, onUnmounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMovieStore } from '@/stores/movieStore';
  import {
    MovieHeader,
    MovieCast,
    MovieCrew,
    MovieDetailsInfo,
    MovieProductionCompanies,
    MovieLoadingState,
    MovieErrorState,
  } from '@/components/movie-detail';

  const route = useRoute();
  const movieStore = useMovieStore();

  // Computed properties
  const hasDetails = computed(() => {
    return (
      movieStore.selectedMovie!.status ||
      movieStore.selectedMovie!.production_companies?.length
    );
  });

  // Watch for route changes and handle movie selection
  watch(
    () => route.params.id,
    newId => {
      if (newId) {
        const movieId = parseInt(newId as string);
        if (
          movieId &&
          (!movieStore.selectedMovie || movieStore.selectedMovie.id !== movieId)
        ) {
          movieStore.selectMovie(movieId);
        }
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    movieStore.selectedMovie = null;
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
