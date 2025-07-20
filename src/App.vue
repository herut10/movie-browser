<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterView } from 'vue-router';
  import { AppHeader } from '@/components/app-header';
  import { useMovieStore } from '@/stores/movieStore';

  const movieStore = useMovieStore();

  const movieTitle = computed(() => {
    return movieStore.selectedMovie?.title;
  });
</script>

<template>
  <v-app>
    <AppHeader
      :show-back-button="$route.meta.showBackButton as boolean"
      :title-override="movieTitle"
    />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
  /* Global styles are handled in main.css */
</style>
