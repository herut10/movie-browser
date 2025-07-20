<template>
  <div>
    <div class="d-flex align-center mb-2">
      <v-icon size="16" color="grey" class="mr-2">mdi-calendar</v-icon>
      <span class="text-caption text-medium-emphasis">
        {{ formatDate(movie.release_date) }}
      </span>
      <v-chip
        v-if="isFutureDate(movie.release_date)"
        size="x-small"
        variant="outlined"
        color="primary"
        class="ml-2"
      >
        Coming Soon
      </v-chip>
      <v-chip
        v-else-if="getRelativeTime(movie.release_date) === 'Today'"
        size="x-small"
        color="success"
        class="ml-2"
      >
        Released Today
      </v-chip>
    </div>

    <div class="d-flex align-center text-caption text-medium-emphasis">
      <span>{{ getRelativeTime(movie.release_date) }}</span>
      <v-divider vertical class="mx-2"></v-divider>
      <span v-if="'runtime' in movie && (movie as any).runtime">{{
        formatRuntime((movie as any).runtime)
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Movie } from '@/types/movie';
  import {
    formatDate,
    getRelativeTime,
    formatRuntime,
    isFutureDate,
  } from '@/utils/temporal';

  defineProps<{
    movie: Movie;
  }>();
</script>
