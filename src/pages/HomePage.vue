<template>
  <div class="home-page">
    <!-- Main Content -->
    <main class="main-content">
      <!-- Virtualized Movie List -->
      <VirtualizedMovieList
        :movies="movieStore.filteredMovies"
        :is-loading="movieStore.isLoading"
        :has-more="movieStore.canLoadMore"
        @load-more="movieStore.loadNextPage"
        @movie-click="handleMovieClick"
      />
    </main>

    <!-- Filter Drawer -->
    <FilterDrawer v-model="isFilterDrawerOpen" />

    <!-- Floating Filter Button -->
    <FloatingFilterButton
      :has-active-filters="movieStore.hasActiveFilters"
      @click="isFilterDrawerOpen = true"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMovieStore } from '@/stores/movieStore';
  import type { Movie } from '@/types/movie';
  import { VirtualizedMovieList } from '@/components/virtualized-movie-list';
  import { FilterDrawer } from '@/components/filter-drawer';
  import { FloatingFilterButton } from '@/components/floating-filter-button';

  const router = useRouter();
  const movieStore = useMovieStore();
  const isFilterDrawerOpen = ref(false);

  // Handle movie click
  const handleMovieClick = (movie: Movie) => {
    movieStore.selectMovie(movie.id);
    router.push({ name: 'movie-detail', params: { id: movie.id } });
  };

  // Fetch movies on mount
  onBeforeMount(async () => {
    movieStore.fetchMovies();
  });
</script>

<style scoped>
  .home-content {
    padding-top: 24px;
  }
</style>
