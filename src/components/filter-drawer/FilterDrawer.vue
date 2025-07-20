<template>
  <v-navigation-drawer v-model="isOpen" location="right" width="400" temporary>
    <v-card flat class="filter-drawer-card">
      <v-card-title class="d-flex align-center justify-space-between pa-6">
        <div>
          <span class="text-h6">Filters</span>
          <div
            v-if="movieStore.hasMovies"
            class="text-caption text-medium-emphasis mt-1"
          >
            Found {{ movieStore.totalResults }} movies
          </div>
        </div>
        <CustomButton
          prepend-icon="mdi-close"
          variant="text"
          size="small"
          @click="closeDrawer"
        />
      </v-card-title>

      <v-card-text class="pa-6 drawer-content">
        <!-- Search Input -->
        <SearchInput
          v-model="movieStore.filters.query"
          @update:model-value="updateQuery"
        />

        <!-- Year Filter -->
        <YearSelector
          v-model="movieStore.filters.year"
          class="mb-4"
          @update:model-value="updateYear"
        />

        <!-- Rating Filter -->
        <RatingFilter
          v-model="movieStore.filters.rating"
          @update:model-value="updateRating"
        />

        <!-- Genre Filter -->
        <GenreFilter
          v-model="movieStore.filters.genre"
          @update:model-value="updateGenre"
        />
      </v-card-text>

      <!-- Sticky Clear Filters Button -->
      <v-card-actions class="pa-6 pt-0 sticky-bottom">
        <CustomButton
          full-width
          color="error"
          variant="outlined"
          @click="clearAllFilters"
        >
          Clear All Filters
        </CustomButton>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMovieStore } from '@/stores/movieStore';
  import CustomButton from '@/components/ui/CustomButton.vue';
  import YearSelector from '@/components/ui/YearSelector.vue';
  import {
    SearchInput,
    RatingFilter,
    GenreFilter,
  } from '@/components/filter-inputs';

  const { modelValue } = defineProps<{
    modelValue: boolean;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
  }>();

  const movieStore = useMovieStore();

  // Computed properties
  const isOpen = computed({
    get: () => modelValue,
    set: value => emit('update:modelValue', value),
  });

  // Methods
  const closeDrawer = () => {
    emit('update:modelValue', false);
  };

  const updateQuery = (value: string) => {
    movieStore.updateFilters({ query: value });
  };

  const updateYear = (value: string) => {
    movieStore.updateFilters({ year: value });
  };

  const updateRating = (value: string) => {
    movieStore.updateFilters({ rating: value });
  };

  const updateGenre = (value: string[]) => {
    movieStore.updateFilters({ genre: value });
  };

  const clearAllFilters = () => {
    movieStore.clearFilters();
  };
</script>

<style scoped>
  .filter-drawer-card {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .drawer-content {
    flex: 1;
    overflow-y: auto;
  }

  .sticky-bottom {
    position: sticky;
    bottom: 0;
    background: var(--v-theme-surface);
    border-top: 1px solid var(--v-theme-outline-variant);
    z-index: 10;
  }
</style>
