<template>
  <v-select
    :model-value="modelValue"
    label="Minimum Rating"
    variant="outlined"
    density="compact"
    class="mb-4"
    clearable
    :items="ratingOptions"
    @update:model-value="handleChange"
  />
</template>

<script setup lang="ts">
  const { modelValue } = defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  // Rating options
  const ratingOptions = [
    { title: 'Any Rating', value: '' },
    { title: '10+ Stars', value: '10' },
    { title: '9+ Stars', value: '9' },
    { title: '8+ Stars', value: '8' },
    { title: '7+ Stars', value: '7' },
    { title: '6+ Stars', value: '6' },
    { title: '5+ Stars', value: '5' },
    { title: '4+ Stars', value: '4' },
    { title: '3+ Stars', value: '3' },
    { title: '2+ Stars', value: '2' },
    { title: '1+ Stars', value: '1' },
  ];

  const handleChange = (value: string) => {
    emit('update:modelValue', value || '');
  };
</script>
