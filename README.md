# Movie Browser

A modern Vue 3 movie browsing application built with Vuetify, featuring infinite scrolling, advanced filtering, and movie details.

## Features

- 🎬 **Movie Discovery**: Browse movies with infinite scrolling
- 🔍 **Advanced Filtering**: Filter by year, rating, genre, and search query
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **Virtual Scrolling**: Smooth performance with large datasets
- 🎨 **Modern UI**: Built with Vuetify 3 for a beautiful interface
- 🔄 **Real-time Updates**: Instant filter updates with debouncing

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design component framework
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Vue Virtual Scroller** - High-performance virtual scrolling
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **TMDB API** - Movie data source

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-browser.git
cd movie-browser
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Code Formatting

This project uses **Prettier** for consistent code formatting and **ESLint** for code quality. The configuration ensures:

- **Consistent Style**: Single quotes, 2-space indentation, 80-character line width
- **Vue Optimization**: Proper Vue 3 formatting with script setup
- **TypeScript Support**: Full TypeScript formatting
- **Auto-fix**: ESLint automatically fixes formatting issues

### Formatting Commands:

```bash
npm run format        # Format all files
npm run format:check  # Check formatting without changing files
npm run lint          # Run ESLint with auto-fix
```

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

2. **Push to main branch**:
   - The GitHub Actions workflow will automatically build and deploy
   - Your app will be available at `https://yourusername.github.io/movie-browser/`

### Manual Deployment

1. Build the project:

```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

## Project Structure

```
src/
├── components/          # Vue components
│   ├── app-header/     # Application header
│   ├── filter-drawer/  # Filter sidebar
│   ├── filter-inputs/  # Filter components
│   ├── movie-card/     # Movie card component
│   ├── movie-detail/   # Movie detail components
│   └── virtualized-movie-list/ # Virtual scrolling list
├── pages/              # Page components
├── stores/             # Pinia stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── router/             # Vue Router configuration
```

## API Configuration

This app uses The Movie Database (TMDB) API. To get your API key:

1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account
3. Go to Settings > API
4. Request an API key
5. Add the key to your `.env` file

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Vuetify](https://vuetifyjs.com/) for the beautiful UI components
- [Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller) for smooth scrolling performance
