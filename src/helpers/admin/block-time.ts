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
export const blockTime = (date: "now" | string) =>
  Math.floor((date === "now" ? new Date() : new Date(date)).getTime() / 1000);
