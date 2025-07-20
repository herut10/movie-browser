<template>
  <div class="floating-filter-button">
    <CustomButton
      :color="hasActiveFilters || hasSearchQuery ? 'primary' : 'default'"
      size="large"
      custom-class="filter-fab"
      @click="$emit('openFilters')"
    >
      <v-icon size="24">mdi-menu</v-icon>
      <v-badge
        v-if="totalActiveCount > 0"
        :content="totalActiveCount"
        color="error"
        location="top end"
        offset-x="8"
        offset-y="8"
      />
    </CustomButton>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMovieStore } from '@/stores/movieStore';
  import CustomButton from '@/components/ui/CustomButton.vue';

  defineEmits<{
    openFilters: [];
  }>();
  const movieStore = useMovieStore();

  // Computed
  const hasActiveFilters = computed(() => movieStore.hasActiveFilters);

  const hasSearchQuery = computed(() => {
    return !!movieStore.filters.query;
  });

  const totalActiveCount = computed(() => {
    let count = 0;
    if (movieStore.filters.query) count++;
    if (movieStore.filters.year) count++;
    if (movieStore.filters.rating) count++;
    if (movieStore.filters.genre) count++;
    return count;
  });
</script>

<style scoped>
  .floating-filter-button {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 1000;
  }

  .filter-fab {
    width: 56px !important;
    height: 56px !important;
    min-width: 56px !important;
    min-height: 56px !important;
    border-radius: 50% !important;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0 !important;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
  }

  /* Mobile-first responsive design */
  .floating-filter-button {
    top: 16px;
    right: 16px;
  }

  .filter-fab {
    width: 48px !important;
    height: 48px !important;
    min-width: 48px !important;
    min-height: 48px !important;
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    .floating-filter-button {
      top: 24px;
      right: 24px;
    }

    .filter-fab {
      width: 56px !important;
      height: 56px !important;
      min-width: 56px !important;
      min-height: 56px !important;
    }
  }
</style>
