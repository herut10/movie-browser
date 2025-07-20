<template>
  <div class="app-header" :class="{ scrolled: isScrolled }">
    <v-container fluid>
      <div
        class="header-layout d-flex align-center"
        :class="{
          'with-back-button': showBackButton,
          'justify-center': !showBackButton,
          'justify-start': showBackButton,
        }"
      >
        <!-- Back Button -->
        <div v-if="showBackButton" class="header-actions flex-shrink-0">
          <CustomButton
            @click="$router.push({ name: 'home' })"
            variant="text"
            prepend-icon="mdi-arrow-left"
            color="primary"
            size="large"
          />
        </div>

        <!-- Main Header Content -->
        <div
          class="header-content flex-grow-1"
          :class="{
            'text-center': !showBackButton && !titleOverride,
            'text-left': showBackButton || titleOverride,
          }"
        >
          <h1 class="main-title" :class="{ 'no-subtitle': titleOverride }">
            {{ titleOverride || 'Movie Browser' }}
          </h1>
          <p v-if="!titleOverride" class="subtitle">
            Discover and search for your favorite movies
          </p>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import debounce from 'lodash.debounce';
  import CustomButton from '@/components/ui/CustomButton.vue';

  defineProps<{
    showBackButton?: boolean;
    titleOverride?: string;
  }>();

  const isScrolled = ref(false);
  const isAnimating = ref(false);
  const lastScrollTop = ref(0);

  // Simple scroll handler with snap point behavior and direction tracking
  const handleScroll = debounce(() => {
    // Don't update during header animation
    if (isAnimating.value) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const newScrolledState = scrollTop > 20;

    // Detect scroll direction
    const isScrollingDown = scrollTop > lastScrollTop.value;

    // Only update if the state actually changed
    if (isScrolled.value !== newScrolledState) {
      console.log('Header state changing:', {
        scrollTop,
        newScrolledState,
        isScrollingDown,
      });
      isScrolled.value = newScrolledState;

      // Set animation flag to prevent feedback loop
      isAnimating.value = true;

      // Force scroll in the detected direction with larger nudge
      const forceAmount = isScrollingDown ? 25 : -25;
      window.scrollBy(0, forceAmount);

      setTimeout(() => {
        isAnimating.value = false;
      }, 300); // Match the CSS transition duration
    }

    lastScrollTop.value = scrollTop;
  }, 13); // Smooth debounce

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
  });

  onUnmounted(() => {
    handleScroll.cancel(); // Cancel any pending debounced calls
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style scoped lang="scss">
  @use '@/assets/variables.scss' as vars;

  .app-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: linear-gradient(
      135deg,
      var(--v-theme-surface) 0%,
      var(--v-theme-surface-variant) 100%
    );
    border-bottom: 1px solid var(--v-theme-outline-variant);
    backdrop-filter: blur(10px);
    transition:
      padding vars.$transition-normal,
      background vars.$transition-normal,
      backdrop-filter vars.$transition-normal;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 24px 0;
    will-change: padding, background, backdrop-filter;

    &.scrolled {
      background: rgba(var(--v-theme-surface), 0.95);
      backdrop-filter: blur(20px);
      padding: 12px 0;

      .main-title {
        font-size: 1.5rem;
        margin-bottom: 4px;
      }

      .subtitle {
        font-size: 0.875rem;
      }
    }
  }

  .header-layout {
    &.with-back-button {
      gap: 24px;
    }
  }

  .header-content {
    max-width: 800px;

    &:not(.text-left) {
      margin: 0 auto;
    }
  }

  .main-title {
    font-size: 2rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 8px;
    color: var(--v-theme-primary);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: font-size vars.$transition-normal;

    &.no-subtitle {
      margin-bottom: 0;
    }
  }

  .subtitle {
    font-size: 1rem;
    color: var(--v-theme-on-surface-variant);
    margin: 0;
    transition: font-size vars.$transition-normal;
  }

  /* Small screens (sm) */
  @media (min-width: 600px) {
    .main-title {
      font-size: 2.5rem;
      margin-bottom: 12px;
    }

    .subtitle {
      font-size: 1.1rem;
    }

    .app-header.scrolled {
      .main-title {
        font-size: 1.75rem;
        margin-bottom: 6px;
      }

      .subtitle {
        font-size: 0.9rem;
      }
    }
  }

  /* Medium screens (md) */
  @media (min-width: 960px) {
    .main-title {
      font-size: 3rem;
      margin-bottom: 16px;
    }

    .subtitle {
      font-size: 1.2rem;
    }

    .app-header.scrolled {
      .main-title {
        font-size: 2rem;
        margin-bottom: 8px;
      }

      .subtitle {
        font-size: 0.95rem;
      }
    }
  }

  /* Large screens (lg) */
  @media (min-width: 1280px) {
    .main-title {
      font-size: 3.5rem;
      margin-bottom: 20px;
    }

    .subtitle {
      font-size: 1.25rem;
    }

    .app-header.scrolled {
      .main-title {
        font-size: 2.25rem;
        margin-bottom: 10px;
      }

      .subtitle {
        font-size: 1rem;
      }
    }
  }
</style>
