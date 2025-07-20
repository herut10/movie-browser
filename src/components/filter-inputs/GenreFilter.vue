<template>
  <v-select
    :model-value="modelValue"
    label="Genre"
    variant="outlined"
    density="compact"
    class="mb-4"
    clearable
    multiple
    chips
    closable-chips
    :items="genreOptions"
    @update:model-value="handleChange"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMovieStore } from '@/stores/movieStore';

  const { modelValue } = defineProps<{
    modelValue: string[];
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: string[]];
  }>();

  const movieStore = useMovieStore();

  // Genre options from store
  const genreOptions = computed(() => {
    return movieStore.genres.map(genre => ({
      title: genre.name,
      value: genre.id.toString(),
    }));
  });

  const handleChange = (value: string[]) => {
    emit('update:modelValue', value || []);
  };
</script>
