import { ref, computed } from 'vue';

import {
  getCurrentYear,
  generateYearOptions,
  isValidDate,
} from '@/utils/temporal';

export function useTemporalSearch() {
  const searchQuery = ref('');
  const selectedYear = ref('');
  const selectedRating = ref('');
  const selectedGenre = ref('');
  const dateRange = ref<{ start: string; end: string }>({ start: '', end: '' });

  // Generate year options using Temporal API
  const yearOptions = computed(() => generateYearOptions(30));

  // Get current year using Temporal API
  const currentYear = computed(() => getCurrentYear());

  // Validate date range
  const isDateRangeValid = computed(() => {
    if (!dateRange.value.start || !dateRange.value.end) return true;
    return (
      isValidDate(dateRange.value.start) && isValidDate(dateRange.value.end)
    );
  });

  // Get date range for API
  const getDateRangeParams = computed(() => {
    if (!dateRange.value.start && !dateRange.value.end) return {};

    const params: Record<string, string> = {};

    if (dateRange.value.start && isValidDate(dateRange.value.start)) {
      params['primary_release_date.gte'] = dateRange.value.start;
    }

    if (dateRange.value.end && isValidDate(dateRange.value.end)) {
      params['primary_release_date.lte'] = dateRange.value.end;
    }

    return params;
  });

  // Clear all filters
  const clearFilters = () => {
    searchQuery.value = '';
    selectedYear.value = '';
    selectedRating.value = '';
    selectedGenre.value = '';
    dateRange.value = { start: '', end: '' };
  };

  // Get search parameters for API
  const getSearchParams = computed(() => {
    const params: Record<string, string | number> = {};

    if (searchQuery.value.trim()) {
      params.query = searchQuery.value.trim();
    }

    if (selectedYear.value) {
      params.year = selectedYear.value;
    }

    if (selectedRating.value) {
      params['vote_average.gte'] = selectedRating.value;
    }

    if (selectedGenre.value) {
      params.with_genres = selectedGenre.value;
    }

    // Add date range parameters
    Object.assign(params, getDateRangeParams.value);

    return params;
  });

  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return (
      searchQuery.value ||
      selectedYear.value ||
      selectedRating.value ||
      selectedGenre.value ||
      dateRange.value.start ||
      dateRange.value.end
    );
  });

  // Get relative time for display
  const getRelativeTimeDisplay = (dateString: string) => {
    try {
      const date = Temporal.PlainDate.from(dateString);
      const now = Temporal.Now.plainDateISO();
      const diff = now.since(date);

      const years = Math.abs(diff.years);
      const months = Math.abs(diff.months);
      const days = Math.abs(diff.days);

      if (years > 0) {
        return `${years} year${years === 1 ? '' : 's'} ago`;
      } else if (months > 0) {
        return `${months} month${months === 1 ? '' : 's'} ago`;
      } else if (days > 0) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
      } else {
        return 'Today';
      }
    } catch {
      return 'Unknown';
    }
  };

  return {
    // State
    searchQuery,
    selectedYear,
    selectedRating,
    selectedGenre,
    dateRange,

    // Computed
    yearOptions,
    currentYear,
    isDateRangeValid,
    getSearchParams,
    hasActiveFilters,

    // Methods
    clearFilters,
    getRelativeTimeDisplay,
  };
}
