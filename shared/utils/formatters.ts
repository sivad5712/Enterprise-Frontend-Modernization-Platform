/**
 * Formats a numeric value as USD currency.
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Formats a fraction or raw percentage (e.g. 0.05 or 5) into a percentage string.
 */
export const formatPercent = (value: number, isFraction: boolean = false): string => {
  const normalizedValue = isFraction ? value * 100 : value;
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(normalizedValue / 100);
};

/**
 * Formats large operational integers into compact notation (e.g., 1.2M, 45K).
 */
export const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(value);
};

/**
 * Formats standard snake_case strings into reader-friendly Title Case labels.
 */
export const formatTitleCase = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
};
