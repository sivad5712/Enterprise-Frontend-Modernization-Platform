/**
 * Formats a ISO date string into standard enterprise date-time view (e.g. Jun 2, 2026, 11:06 AM).
 */
export const formatDateTime = (isoString: string): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

/**
 * Returns a reader-friendly relative time string (e.g. "3 hours ago", "just now").
 */
export const formatTimeAgo = (isoString: string): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 10) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return formatDateTime(isoString);
};

/**
 * Returns a short formatted date only (e.g. 2026-06-02).
 */
export const formatShortDate = (isoString: string): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toISOString().split('T')[0];
};
