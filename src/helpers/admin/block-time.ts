/**
 *
 * @param timestamp - block timestamp in seconds or 0
 */
export const hasElapsed = (timestamp: number) =>
  timestamp === 0 ? false : timestamp <= blockTime("now");

/**
 *
 * @param date - date string or "now"
 * @returns block timestamp in seconds
 */
export const blockTime = (date: "now" | string): number =>
  Math.floor((date === "now" ? new Date() : new Date(date)).getTime() / 1000);

export const fromBlockTime = (blockTime: number | string) =>
  new Date(+blockTime * 1000);

/**
 *
 * @param seconds - block timestamp in seconds
 * @returns duration in hours
 */
export const toHours = (seconds: number) => (seconds / 3600).toFixed(2);

/**
 *
 * @param hours - duration in hours
 * @returns seconds duration
 */
export const fromHours = (hours: number) => Math.floor(hours * 3600);
