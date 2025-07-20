<template>
  <v-btn
    :variant="variant"
    :size="size"
    :color="color"
    :disabled="disabled"
    :loading="loading"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :class="buttonClasses"
    :style="buttonStyle"
    @click="handleClick"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const {
    variant = 'elevated',
    color = 'primary',
    size = 'default',
    disabled = false,
    loading = false,
    fullWidth = false,
    customClass = '',
    customColor = '',
    customTextColor = '',
    prependIcon = undefined,
    appendIcon = undefined,
  } = defineProps<{
    variant?: 'elevated' | 'outlined' | 'text' | 'tonal' | 'flat' | 'plain';
    color?: string;
    size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    customClass?: string;
    customColor?: string;
    customTextColor?: string;
    prependIcon?: string;
    appendIcon?: string;
  }>();

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();

  const buttonClasses = computed(() => {
    const classes = ['custom-button'];

    if (fullWidth) {
      classes.push('full-width');
    }

    if (customClass) {
      classes.push(customClass);
    }

    return classes.join(' ');
  });

  const buttonStyle = computed(() => {
    const style: Record<string, string> = {};

    if (customColor) {
      style['--v-theme-primary'] = customColor;
    }

    if (customTextColor) {
      style['--v-theme-on-primary'] = customTextColor;
    }

    return style;
  });

  const handleClick = (event: MouseEvent) => {
    if (!disabled && !loading) {
      emit('click', event);
    }
  };
</script>

<style scoped lang="scss">
  @use '@/assets/variables.scss' as vars;

  .custom-button {
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;

    &.full-width {
      width: 100%;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
      transform: none;
      box-shadow: none;
    }
  }

  /* Quick View Button Variant */
  .custom-button.quick-view-btn {
    background: var(--v-theme-primary);
    color: var(--v-theme-on-primary);

    &:hover {
      background: var(--v-theme-primary-darken-1);
    }
  }
</style>
