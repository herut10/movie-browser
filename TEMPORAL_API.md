# Temporal API Implementation

This project uses the Temporal API polyfill (`@js-temporal/polyfill`) for enhanced date and time handling throughout the application.

## Features Implemented

### 1. **Date Formatting & Parsing**

- `formatDate()` - Format dates using Temporal API with locale support
- `getYearFromDate()` - Extract year from date strings with validation
- `isValidDate()` - Validate date string formats

### 2. **Duration Handling**

- `formatRuntime()` - Convert minutes to hours and minutes format
- Duration calculations for movie runtimes
- Relative time calculations

### 3. **Relative Time**

- `getRelativeTime()` - Calculate relative time (e.g., "2 days ago")
- Used in movie cards and detail pages
- Handles edge cases gracefully

### 4. **Date Validation**

- `isFutureDate()` - Check if a date is in the future
- Used for "Coming Soon" badges on movies
- API parameter validation

### 5. **Search & Filtering**

- `generateYearOptions()` - Generate year dropdown options
- `getCurrentYear()` - Get current year using Temporal API
- Date range validation for search filters

### 6. **Currency Formatting**

- `formatCurrency()` - Format currency with Temporal API for consistent timezone handling
- Used for movie budget and revenue display

## Components Using Temporal API

### 1. **MovieReleaseInfo.vue**

- Shows release date with relative time
- Displays "Coming Soon" badge for future releases
- Uses Temporal API for all date calculations

### 2. **TemporalDemo.vue**

- Demonstrates various Temporal API features
- Shows current time, date operations, duration examples
- Real-time updates using Temporal API

### 3. **SearchBar.vue**

- Year options generated using Temporal API
- Date validation for search parameters
- Current year calculation

### 4. **MovieCard.vue**

- Release date formatting
- Year extraction for display
- Relative time calculations

### 5. **MovieDetailPage.vue**

- Runtime formatting using Temporal Duration
- Release date formatting
- Currency formatting with Temporal API

## Utility Functions

### `src/utils/temporal.ts`

Contains all Temporal API utility functions:

```typescript
// Date formatting
formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string
getYearFromDate(dateString: string): string

// Duration handling
formatRuntime(minutes: number): string

// Relative time
getRelativeTime(dateString: string): string

// Validation
isFutureDate(dateString: string): boolean
isValidDate(dateString: string): boolean

// Search utilities
getCurrentYear(): number
generateYearOptions(count: number): number[]

// Currency formatting
formatCurrency(amount: number, currency?: string): string
```

### `src/composables/useTemporalSearch.ts`

Composable for enhanced search functionality:

```typescript
// State management
(searchQuery, selectedYear, selectedRating, selectedGenre, dateRange);

// Computed properties
(yearOptions, currentYear, isDateRangeValid, getSearchParams, hasActiveFilters);

// Methods
(clearFilters(), getRelativeTimeDisplay());
```

## API Integration

### `src/utils/api.ts`

- `validateDateParams()` - Validates date parameters for API calls
- Uses Temporal API for date validation
- Prevents invalid date parameters from being sent to TMDB API

## Benefits of Temporal API

1. **Better Date Handling**: More precise date calculations and formatting
2. **Timezone Support**: Proper timezone handling for international users
3. **Duration Calculations**: Accurate duration formatting for movie runtimes
4. **Validation**: Robust date validation preventing API errors
5. **Future-Proof**: Uses modern date/time standards
6. **Performance**: Efficient date operations compared to native Date API

## Browser Support

The Temporal API polyfill provides support for:

- Chrome 84+
- Firefox 79+
- Safari 14+
- Edge 84+

For older browsers, the polyfill gracefully falls back to native Date API where needed.

## Usage Examples

```typescript
// Format a movie release date
const releaseDate = formatDate('2024-01-15'); // "January 15, 2024"

// Get relative time
const relativeTime = getRelativeTime('2024-01-15'); // "2 days ago"

// Format runtime
const runtime = formatRuntime(125); // "2h 5m"

// Check if movie is coming soon
const isComingSoon = isFutureDate('2024-12-25'); // true

// Generate year options for search
const years = generateYearOptions(30); // [2024, 2023, 2022, ...]
```

## Future Enhancements

1. **Advanced Date Range Filtering**: Implement date range picker using Temporal API
2. **Timezone-Aware Display**: Show release times in user's timezone
3. **International Date Formats**: Support for different locale date formats
4. **Calendar Integration**: Add calendar view for movie releases
5. **Reminder System**: Set reminders for upcoming movie releases
