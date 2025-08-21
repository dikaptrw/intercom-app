import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates a string to the specified length, optionally adding a custom ellipsis.
 *
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the truncated string.
 * @param {boolean} [useEllipsis=true] - Whether to append an ellipsis after truncating. Default is `true`.
 * @param {string} [customEllipsis='...'] - A custom string to append when truncating, used only if `useEllipsis` is `true`. Default is `'...'`.
 * @returns {string} - The truncated string, with or without the ellipsis.
 */
export function truncateString(
  str: string,
  maxLength: number,
  useEllipsis: boolean = true,
  customEllipsis: string = '...',
): string {
  if (str.length <= maxLength) {
    return str;
  }

  if (useEllipsis) {
    return str.slice(0, maxLength) + customEllipsis;
  }

  return str.slice(0, maxLength);
}

/**
 * Extracts the initials from a given name.
 *
 * If the name contains multiple words, it returns the first character of the first two words.
 * If the name is a single word, it returns the first two letters of that word.
 *
 * @param name - The input name as a string.
 * @returns A string containing the initials.
 */
export function getInitials(name: string): string {
  // Split the name into words and filter out any empty strings (e.g., extra spaces)
  const words: string[] = name.split(' ').filter((word) => word.length > 0);

  // Check if the name contains multiple words
  if (words.length > 1) {
    // Return the first letter of the first two words
    return words[0][0] + words[1][0];
  }

  // For a single-word name, return the first two letters.
  return words[0].slice(0, 2);
}
