<template>
  <v-col
    cols="12"
    md="6"
    v-if="movieStore.selectedMovie!.production_companies?.length"
  >
    <v-card>
      <v-card-title>Production Companies</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="company in productionCompanies" :key="company.id">
            <template v-slot:prepend>
              <v-avatar size="32" v-if="company.logo_path">
                <v-img
                  :src="company.logoUrl || ''"
                  :alt="company.name"
                  contain
                />
              </v-avatar>
              <v-icon v-else>mdi-domain</v-icon>
            </template>
            <v-list-item-title>{{ company.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMovieStore } from '@/stores/movieStore';
  import { getImageUrl } from '@/utils/image-utils';

  const movieStore = useMovieStore();

  const productionCompanies = computed(() => {
    const movie = movieStore.selectedMovie!;
    return (
      movie.production_companies?.map(company => ({
        ...company,
        logoUrl: company.logo_path
          ? getImageUrl(company.logo_path, 'w92')
          : null,
      })) || []
    );
  });
</script>
