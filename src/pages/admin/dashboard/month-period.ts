import {
  addDays,
  endOfMonth,
  format,
  formatDistance,
  startOfMonth,
  subDays,
} from "date-fns";
export function monthPeriod() {
  const now = new Date();
  const from = startOfMonth(now);
  const to = endOfMonth(now);
  const next = addDays(to, 1);
  /** pre-processing starts 1 day
   *  before end of the period
   *  which actions are disabled
   * */
  const pre = subDays(to, 1);

  return {
    from: format(from, "PP"),
    to: format(to, "PP"),
    next: format(next, "PP"),
    distance: formatDistance(now, next),
    /** pre-processing starts */
    isPre: now >= pre,
  };
}
