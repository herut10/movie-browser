<template>
  <v-card
    class="movie-card d-flex flex-column"
    @click="handleCardClick"
    hover
    elevation="2"
  >
    <div class="movie-card-content d-flex flex-column">
      <!-- Poster Image with Golden Ratio -->
      <div class="poster-container">
        <v-img
          :src="posterImageUrl"
          :alt="movie.title"
          contain
          class="poster-image"
        />

        <!-- Rating Chip -->
        <v-chip
          class="rating-chip"
          color="amber"
          size="small"
          variant="elevated"
        >
          <v-icon size="12" class="mr-1">mdi-star</v-icon>
          {{ formattedRating }}
        </v-chip>
      </div>

      <!-- Movie Info -->
      <div
        class="movie-info d-flex flex-column justify-space-between flex-grow-1"
      >
        <h3 class="movie-title">
          {{ movie.title }}
        </h3>
        <MovieReleaseInfo :movie="movie" />

        <!-- Quick View Button at bottom -->
        <div class="quick-view-button">
          <MovieDialog :movie="movie">
            <template #activator="{ on }">
              <CustomButton
                variant="elevated"
                size="small"
                color="primary"
                prepend-icon="mdi-eye"
                custom-class="quick-view-btn"
                full-width
                @click="on.click"
                @click.stop
              >
                Quick View
              </CustomButton>
            </template>
          </MovieDialog>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMovieStore } from '@/stores/movieStore';
  import type { Movie } from '@/types/movie';
  import { getImageUrl } from '@/utils/api';
  import { MovieReleaseInfo } from '@/components/movie-release-info';
  import { MovieDialog } from '@/components/movie-dialog';
  import CustomButton from '@/components/ui/CustomButton.vue';

  const { movie } = defineProps<{
    movie: Movie;
  }>();

  const router = useRouter();
  const movieStore = useMovieStore();

  // Computed properties for template values
  const posterImageUrl = computed(() => getImageUrl(movie.poster_path));
  const formattedRating = computed(() => movie.vote_average.toFixed(1));

  const handleCardClick = async () => {
    // Select the movie in the store first (this will show it immediately)
    await movieStore.selectMovie(movie.id);
    // Then navigate to the detail page
    router.push({ name: 'movie-detail', params: { id: movie.id } });
  };
</script>

<style scoped lang="scss">
  @use '@/assets/variables.scss' as vars;

  .movie-card {
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    border-radius: 12px;
    overflow: hidden;
    background: var(--v-theme-surface);
    border: 1px solid var(--v-theme-outline-variant);
    height: 600px; /* Fixed height for consistent virtual scrolling */

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2) !important;
    }
  }

  .movie-card-content {
    padding: vars.$spacing-md;
    height: 100%;
  }

  .poster-container {
    position: relative;
    width: 100%;
    /* Inverted golden ratio: 1:1.618 */
    aspect-ratio: calc(1 / vars.$golden-ratio);
    margin-bottom: vars.$spacing-sm;
    border-radius: vars.$border-radius-sm;
    overflow: hidden;
    flex-shrink: 0;
  }

  .poster-image {
    width: 100%;
    height: 100%;
    border-radius: vars.$border-radius-sm;
    background: var(--v-theme-surface-variant);
  }

  .rating-chip {
    position: absolute;
    top: vars.$spacing-xs;
    right: vars.$spacing-xs;
    z-index: 2;
  }

  .quick-view-button {
    margin-top: vars.$spacing-md;
    padding: vars.$spacing-sm;
    text-align: center;
    border-top: 1px solid var(--v-theme-outline-variant);
    background: var(--v-theme-surface-variant);
    border-radius: 0 0 12px 12px;
  }

  .quick-view-btn {
    width: 100%;
    background: var(--v-theme-primary);
    color: var(--v-theme-on-primary);
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;

    &:hover {
      background: var(--v-theme-primary-darken-1);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
  }

  .movie-info {
    min-height: 0;
  }

  .movie-title {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: vars.$spacing-sm;
    color: var(--v-theme-on-surface);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.8rem; /* Ensure consistent height for 2 lines */
    text-align: center;
  }
</style>
