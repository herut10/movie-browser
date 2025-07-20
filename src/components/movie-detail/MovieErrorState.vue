<template>
  <v-container class="text-center">
    <v-icon size="64" color="error" class="mb-4">mdi-alert-circle</v-icon>
    <h2 class="text-h5 font-weight-medium mb-2">Error Loading Movie</h2>
    <p class="text-body-1 text-medium-emphasis mb-4">{{ error }}</p>
    <CustomButton @click="$router.push({ name: 'home' })" color="primary">
      Back to Movies
    </CustomButton>
  </v-container>
</template>

<script setup lang="ts">
  import CustomButton from '@/components/ui/CustomButton.vue';

  defineProps<{
    error: string;
  }>();
</script>
