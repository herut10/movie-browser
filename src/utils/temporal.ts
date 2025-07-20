/**
 * Format a date string to a readable format using Temporal API
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  try {
    const date = Temporal.PlainDate.from(dateString);
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    };
    return date.toLocaleString('en-US', defaultOptions);
  } catch {
    return dateString;
  }
}

/**
 * Get the year from a date string using Temporal API
 */
export function getYearFromDate(dateString: string): string {
  try {
    const date = Temporal.PlainDate.from(dateString);
    return date.year.toString();
  } catch {
    return new Date(dateString).getFullYear().toString();
  }
}

/**
 * Format runtime in minutes to hours and minutes using Temporal API
 */
export function formatRuntime(minutes: number): string {
  const duration = Temporal.Duration.from({ minutes });
  const hours = Math.floor(duration.total({ unit: 'hours' }));
  const remainingMinutes = duration.total({ unit: 'minutes' }) % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Get relative time (e.g., "2 days ago") using Temporal API
 */
export function getRelativeTime(dateString: string): string {
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
    return getYearFromDate(dateString);
  }
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  try {
    const date = Temporal.PlainDate.from(dateString);
    const now = Temporal.Now.plainDateISO();
    return Temporal.PlainDate.compare(date, now) > 0;
  } catch {
    return false;
  }
}

/**
 * Get the current year using Temporal API
 */
export function getCurrentYear(): number {
  return Temporal.Now.plainDateISO().year;
}

/**
 * Generate an array of years (current year going back) using Temporal API
 */
export function generateYearOptions(count: number = 30): number[] {
  const currentYear = getCurrentYear();
  return Array.from({ length: count }, (_, i) => currentYear - i);
}

/**
 * Format currency with Temporal API for consistent formatting
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  if (amount === 0) return 'N/A';

  try {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  } catch {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
}

/**
 * Validate date string format using Temporal API
 */
export function isValidDate(dateString: string): boolean {
  try {
    Temporal.PlainDate.from(dateString);
    return true;
  } catch {
    return false;
  }
}
