<template>
  <v-text-field
    :model-value="modelValue"
    label="Search Movies"
    placeholder="Enter movie title..."
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    density="compact"
    class="mb-6"
    clearable
    @update:model-value="handleSearch"
    @click:clear="clearSearch"
  />
</template>

<script setup lang="ts">
  import debounce from 'lodash.debounce';

  const { modelValue } = defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  // Debounced search
  const debouncedSearch = debounce((query: string) => {
    emit('update:modelValue', query);
  }, 500);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const clearSearch = () => {
    emit('update:modelValue', '');
  };
</script>
