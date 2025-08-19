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
