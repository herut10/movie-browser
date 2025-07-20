<template>
  <v-select
    :model-value="modelValue"
    label="Year"
    placeholder="Select year..."
    variant="outlined"
    density="compact"
    clearable
    :items="yearOptions"
    @update:model-value="handleChange"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const { modelValue } = defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  // Generate year options from current year back to 1900
  const yearOptions = computed(() => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= 1900; year--) {
      years.push({
        title: year.toString(),
        value: year.toString(),
      });
    }

    return years;
  });

  const handleChange = (value: string) => {
    emit('update:modelValue', value || '');
  };
</script>
