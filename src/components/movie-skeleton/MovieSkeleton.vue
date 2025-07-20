<template>
  <v-card>
    <v-card-text class="pa-4">
      <div class="mb-3 skeleton-poster">
        <v-skeleton-loader type="image" class="rounded-lg" />
      </div>

      <div>
        <v-skeleton-loader type="text" class="mb-2" style="width: 75%" />
        <v-skeleton-loader type="text" class="mb-1" style="width: 50%" />
        <v-skeleton-loader type="text" style="width: 66%" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  // No imports needed - using Vuetify components
</script>

<style scoped>
  .skeleton-poster {
    aspect-ratio: 1.618;
  }
</style>
