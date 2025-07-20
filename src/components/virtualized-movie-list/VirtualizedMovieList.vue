<template>
  <div class="movie-list-container d-flex flex-column align-center">
    <!-- Virtualized Movie Grid -->
    <div
      ref="containerRef"
      class="virtual-grid-container"
      :style="{
        width: shouldCenter ? `${optimalContainerWidth}px` : '100%',
        maxWidth: '100%',
      }"
    >
      <RecycleScroller
        v-if="movies.length > 0"
        :key="`scroller-${itemsPerRow}`"
        :items="movies"
        :item-size="600"
        :item-secondary-size="248"
        :page-mode="true"
        :prerender="5"
        :buffer="400"
        :grid-items="itemsPerRow"
        key-field="id"
        list-class="movie-grid-list"
        class="virtual-scroller"
        direction="vertical"
        :emit-update="true"
        ref="scrollerRef"
        @update="handleUpdate"
      >
        <template #default="{ item: movie }">
          <MovieCard :key="movie.id" :movie="movie" class="movie-item" />
        </template>
      </RecycleScroller>

      <!-- Loading Skeletons -->
      <div
        v-if="isLoading && hasMore"
        class="skeleton-grid"
        :style="{
          gridTemplateColumns: `repeat(${itemsPerRow}, ${fixedItemWidth}px)`,
          gap: `${itemGap}px`,
          justifyContent: 'center',
        }"
      >
        <MovieSkeleton v-for="n in 12" :key="n" class="skeleton-item" />
      </div>
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading && hasMore" class="loading-indicator pa-8 text-center">
      <v-progress-circular indeterminate color="primary" size="32" />
      <p class="text-body-2 text-medium-emphasis mt-4">
        Loading more movies...
      </p>
    </div>

    <!-- End of content indicator -->
    <div
      v-if="!hasMore && movies.length > 0"
      class="end-indicator pa-8 text-center"
    >
      <v-icon size="48" color="grey" class="mb-4">mdi-check-circle</v-icon>
      <p class="text-body-1 text-medium-emphasis">You've reached the end! 🎬</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue';
  import { RecycleScroller } from 'vue-virtual-scroller';
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
  import type { Movie } from '@/types/movie';
  import { MovieCard } from '@/components/movie-card';
  import { MovieSkeleton } from '@/components/movie-skeleton';

  const { movies, isLoading, hasMore } = defineProps<{
    movies: Movie[];
    isLoading: boolean;
    hasMore: boolean;
    itemHeight?: number;
    itemWidth?: number;
    containerHeight?: string;
    containerWidth?: string;
  }>();

  const emit = defineEmits<{
    loadMore: [];
    'movie-click': [movie: Movie];
  }>();

  let resizeObserver: ResizeObserver | null = null;

  // Container and item dimensions
  const containerRef = ref<HTMLElement>();
  const fixedItemWidth = 230; // Fixed item width
  const itemGap = 12; // Gap between items
  const containerPadding = 24; // Container padding

  // Reactive trigger for container size changes
  const containerWidthValue = ref(0);

  // Responsive items per row calculation
  const itemsPerRow = computed(() => {
    if (!containerRef.value) return 4; // Default fallback

    const width = containerRef.value.clientWidth;
    const availableWidth = width - containerPadding * 2; // Account for padding

    // Calculate how many items can fit
    const itemsThatFit = Math.floor(
      (availableWidth + itemGap) / (fixedItemWidth + itemGap)
    );

    // Ensure at least 1 item per row
    return Math.max(1, itemsThatFit);
  });

  // Calculate optimal container width based on items per row
  const optimalContainerWidth = computed(() => {
    const items = itemsPerRow.value;
    const totalItemWidth = items * fixedItemWidth;
    const totalGaps = (items - 1) * itemGap;
    const totalPadding = containerPadding * 2;

    return totalItemWidth + totalGaps + totalPadding;
  });

  // Calculate if container should be centered
  const shouldCenter = computed(() => {
    if (!containerRef.value) return false;
    const containerWidth = containerRef.value.clientWidth;
    return optimalContainerWidth.value < containerWidth;
  });

  // Grid configuration for debugging
  const gridConfig = computed(() => ({
    itemsPerRow: itemsPerRow.value,
    optimalWidth: optimalContainerWidth.value,
    shouldCenter: shouldCenter.value,
    containerWidth: containerRef.value?.clientWidth || 0,
    itemWidth: fixedItemWidth,
    gap: itemGap,
    padding: containerPadding,
  }));

  // Update container width separately to avoid side effects in computed
  watch(itemsPerRow, () => {
    if (containerRef.value) {
      containerWidthValue.value = containerRef.value.clientWidth;
    }
  });

  // Track virtualization metrics
  const virtualizationMetrics = ref({
    startIndex: 0,
    endIndex: 0,
    visibleStartIndex: 0,
    visibleEndIndex: 0,
  });

  // Track scroll position to preserve it during updates
  const scrollPosition = ref(0);
  const scrollerRef = ref<HTMLElement>();

  // Handle update events from virtual scroller
  const handleUpdate = (
    startIndex: number,
    endIndex: number,
    visibleStartIndex: number,
    visibleEndIndex: number
  ) => {
    virtualizationMetrics.value = {
      startIndex,
      endIndex,
      visibleStartIndex,
      visibleEndIndex,
    };

    // Check if we're near the end for infinite loading
    const totalItems = movies.length;
    const isNearEnd = endIndex >= totalItems - itemsPerRow.value * 3; // Within 4 rows of the end

    if (isNearEnd && !isLoading && hasMore) {
      emit('loadMore');
    }
  };

  // Preserve scroll position when items change
  const preserveScrollPosition = () => {
    if (scrollerRef.value) {
      scrollPosition.value = scrollerRef.value.scrollTop;
    }
  };

  // Restore scroll position after items update
  const restoreScrollPosition = () => {
    if (scrollerRef.value && scrollPosition.value > 0) {
      scrollerRef.value.scrollTop = scrollPosition.value;
    }
  };

  // Component lifecycle
  onMounted(() => {
    // Setup resize observer for responsive grid
    if (containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        if (containerRef.value) {
          containerWidthValue.value = containerRef.value.clientWidth;
        }
      });
      resizeObserver.observe(containerRef.value);
    }
  });

  onUnmounted(() => {
    // Cleanup resize observer
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });

  // Watch for movies array changes to preserve scroll position
  watch(
    () => movies.length,
    (newLength, oldLength) => {
      if (newLength !== oldLength) {
        preserveScrollPosition();
        nextTick(() => {
          restoreScrollPosition();
        });
      }
    }
  );
</script>

<style scoped lang="scss">
  @use '@/assets/variables.scss' as vars;

  .movie-list-container {
    width: 100%;
    min-height: 600px;
  }

  .virtual-grid-container {
    width: 100%;
    max-width: 1400px;
    min-height: 600px;
    position: relative; /* For proper positioning */
    margin: 0 auto; /* Center the container */
    transition: width 0.3s ease; /* Smooth width transitions */
  }

  .virtual-scroller {
    width: 100%;
  }

  :deep(.movie-grid-list) {
    display: grid;
    gap: 12px;
    justify-content: center;
    padding: 12px;
  }

  .movie-item {
    height: 600px; /* Match item-size for virtualization */
    margin: 6px; /* Add margin for spacing */
    box-sizing: border-box; /* Ensure margin is included in width calculation */
  }

  .skeleton-grid {
    display: grid;
    padding: 12px;
  }

  .skeleton-item {
    width: 230px;
    height: 600px;
    margin: 6px;
    box-sizing: border-box;
  }

  .loading-indicator,
  .end-indicator {
    padding: 32px;
    text-align: center;
    max-width: 1400px;
    width: 100%;
  }

  /* Custom scrollbar styling */
  :deep(.vue-recycle-scroller) {
    scrollbar-width: thin;
    scrollbar-color: var(--v-theme-outline-variant) transparent;
  }

  :deep(.vue-recycle-scroller::-webkit-scrollbar) {
    width: 8px;
  }

  :deep(.vue-recycle-scroller::-webkit-scrollbar-track) {
    background: transparent;
  }

  :deep(.vue-recycle-scroller::-webkit-scrollbar-thumb) {
    background-color: var(--v-theme-outline-variant);
    border-radius: 4px;
  }

  :deep(.vue-recycle-scroller::-webkit-scrollbar-thumb:hover) {
    background-color: var(--v-theme-outline);
  }
</style>
