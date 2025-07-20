import { ref, watch } from 'vue';
import debounce from 'lodash.debounce';

export function useDebouncedSearch<T>(
  searchFn: (query: string) => Promise<T>,
  delay = 500
) {
  const query = ref('');
  const results = ref<T | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      results.value = null;
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      results.value = await searchFn(searchQuery);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      results.value = null;
    } finally {
      isLoading.value = false;
    }
  }, delay);

  watch(query, newQuery => {
    debouncedSearch(newQuery);
  });

  const clearSearch = () => {
    query.value = '';
    results.value = null;
    error.value = null;
  };

  return {
    query,
    results,
    isLoading,
    error,
    clearSearch,
  };
}
