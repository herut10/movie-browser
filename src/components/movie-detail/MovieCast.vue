<template>
  <v-row v-if="cast.length" class="mb-8">
    <v-col>
      <h2 class="text-h4 font-weight-bold mb-6">Cast</h2>
      <v-row>
        <v-col
          v-for="member in cast"
          :key="member.id"
          cols="6"
          sm="4"
          md="3"
          lg="2"
          class="text-center"
        >
          <v-avatar size="64" class="mb-2">
            <v-img :src="member.profileUrl" :alt="member.name" cover />
          </v-avatar>
          <p class="text-caption font-weight-medium">{{ member.name }}</p>
          <p class="text-caption text-medium-emphasis">
            {{ member.character }}
          </p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMovieStore } from '@/stores/movieStore';
  import { getProfileUrl } from '@/utils/image-utils';

  const movieStore = useMovieStore();

  const cast = computed(() => {
    if (!movieStore.selectedMovie?.credits?.cast) return [];

    return movieStore.selectedMovie.credits.cast.slice(0, 12).map(member => ({
      ...member,
      profileUrl: getProfileUrl(member.profile_path, 'w185'),
    }));
  });
</script>
