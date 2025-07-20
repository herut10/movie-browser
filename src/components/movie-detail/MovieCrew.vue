<template>
  <v-row v-if="topCrew.length" class="mb-8">
    <v-col>
      <h2 class="text-h4 font-weight-bold mb-6">Crew</h2>
      <v-row>
        <v-col
          v-for="member in topCrew"
          :key="member.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card variant="outlined" class="pa-3">
            <div class="d-flex align-center">
              <v-avatar size="48" class="mr-3">
                <v-img :src="member.profileUrl" :alt="member.name" cover />
              </v-avatar>
              <div>
                <p class="font-weight-medium">{{ member.name }}</p>
                <p class="text-caption text-medium-emphasis">
                  {{ member.job }}
                </p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMovieStore } from '@/stores/movieStore';
  import { getProfileUrl } from '@/utils/api';

  const movieStore = useMovieStore();

  const topCrew = computed(() => {
    if (!movieStore.selectedMovie?.credits?.crew) return [];

    const importantJobs = [
      'Director',
      'Producer',
      'Writer',
      'Screenplay',
      'Editor',
      'Cinematography',
    ];
    return movieStore.selectedMovie.credits.crew
      .filter(member => importantJobs.some(job => member.job.includes(job)))
      .slice(0, 9)
      .map(member => ({
        ...member,
        profileUrl: getProfileUrl(member.profile_path, 'w185'),
      }));
  });
</script>
