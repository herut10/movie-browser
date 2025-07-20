<template>
  <div>
    <!-- Activator slot for custom button -->
    <slot name="activator" :on="activatorProps">
      <CustomButton
        variant="elevated"
        size="small"
        prepend-icon="mdi-eye"
        color="primary"
        custom-class="quick-view-btn"
        @click="isOpen = !isOpen"
      >
        Quick View
      </CustomButton>
    </slot>

    <v-dialog v-model="isOpen" max-width="600">
      <v-card>
        <v-card-title>{{ movie.title }}</v-card-title>
        <v-card-subtitle>
          {{ movie.overview || 'No overview available.' }}
        </v-card-subtitle>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-img
                :src="getImageUrl(movie.poster_path, 'w500')"
                :alt="movie.title"
                class="rounded-lg"
                cover
              />
            </v-col>

            <v-col cols="12" md="6">
              <div class="mb-4">
                <v-chip variant="outlined" class="mr-2">
                  {{ getYearFromDate(movie.release_date) }}
                </v-chip>
                <v-chip
                  v-if="movie.vote_average > 0"
                  variant="outlined"
                  prepend-icon="mdi-star"
                >
                  {{ movie.vote_average.toFixed(1) }}
                </v-chip>
              </div>

              <div class="mb-4">
                <h4 class="text-subtitle-1 font-weight-medium mb-2">
                  Release Date
                </h4>
                <p class="text-body-2 text-medium-emphasis">
                  {{ formatDate(movie.release_date) }}
                </p>
              </div>

              <div>
                <h4 class="text-subtitle-1 font-weight-medium mb-2">
                  Overview
                </h4>
                <p class="text-body-2 text-medium-emphasis line-clamp-4">
                  {{ movie.overview || 'No overview available.' }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="d-flex justify-end">
          <v-spacer></v-spacer>
          <CustomButton
            @click="navigateToDetail"
            color="primary"
            prepend-icon="mdi-information"
          >
            View Full Details
          </CustomButton>
          <CustomButton @click="isOpen = false" variant="outlined">
            Close
          </CustomButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import type { Movie } from '@/types/movie';
  import { getImageUrl } from '@/utils/api';
  import { getYearFromDate, formatDate } from '@/utils/temporal';
  import CustomButton from '@/components/ui/CustomButton.vue';

  const { movie } = defineProps<{
    movie: Movie;
  }>();

  const router = useRouter();
  const isOpen = ref(false);

  // Activator props for the slot
  const activatorProps = computed(() => ({
    click: () => {
      isOpen.value = !isOpen.value;
    },
  }));

  const navigateToDetail = () => {
    isOpen.value = false;
    router.push({ name: 'movie-detail', params: { id: movie.id } });
  };
</script>

<style scoped>
  .quick-view-btn {
    width: 100%;
    background: var(--v-theme-primary) !important;
    color: white !important;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;

    &:hover {
      background: var(--v-theme-primary-darken-1) !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
  }
</style>
