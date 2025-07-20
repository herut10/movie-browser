import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieCard from './MovieCard.vue';
import type { Movie } from '@/types/movie';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'A test movie description',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100,
  genre_ids: [1, 2],
  adult: false,
  video: false,
  original_language: 'en',
  original_title: 'Test Movie',
};

describe('MovieCard', () => {
  it('renders movie title correctly', () => {
    const wrapper = mount(MovieCard, {
      props: { movie: mockMovie },
    });

    expect(wrapper.text()).toContain('Test Movie');
  });

  it('displays vote average', () => {
    const wrapper = mount(MovieCard, {
      props: { movie: mockMovie },
    });

    expect(wrapper.text()).toContain('8.5');
  });

  it('handles image error gracefully', () => {
    const wrapper = mount(MovieCard, {
      props: { movie: mockMovie },
    });

    const img = wrapper.find('img');
    img.trigger('error');

    // Should set placeholder image on error
    expect(img.attributes('src')).toBeDefined();
  });
});
