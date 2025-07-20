<template>
  <v-col cols="12" md="6" v-if="movieStore.selectedMovie!.status">
    <v-card>
      <v-card-title>Details</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="detail in movieDetails"
            :key="detail.key"
            v-show="detail.show"
          >
            <template v-slot:prepend>
              <v-icon>{{ detail.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ detail.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ detail.value }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMovieStore } from '@/stores/movieStore';
  import { formatCurrency } from '@/utils/temporal';

  const movieStore = useMovieStore();

  // Computed properties for derived values
  const movieData = computed(() => {
    const movie = movieStore.selectedMovie!;
    return {
      budget: formatCurrency(movie.budget),
      revenue: formatCurrency(movie.revenue),
    };
  });

  const movieDetails = computed(() => {
    const movie = movieStore.selectedMovie!;
    return [
      {
        key: 'status',
        title: 'Status',
        value: movie.status,
        icon: 'mdi-information',
        show: !!movie.status,
      },
      {
        key: 'language',
        title: 'Original Language',
        value: movie.original_language.toUpperCase(),
        icon: 'mdi-translate',
        show: true,
      },
      {
        key: 'budget',
        title: 'Budget',
        value: movieData.value.budget,
        icon: 'mdi-cash',
        show: !!movie.budget,
      },
      {
        key: 'revenue',
        title: 'Revenue',
        value: movieData.value.revenue,
        icon: 'mdi-trending-up',
        show: !!movie.revenue,
      },
    ];
  });
</script>
