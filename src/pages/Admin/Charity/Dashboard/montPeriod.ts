import {
  addDays,
  endOfMonth,
  format,
  formatDistance,
  startOfMonth,
} from "date-fns";
export function monthPeriod() {
  const now = new Date();
  const from = startOfMonth(now);
  const to = endOfMonth(now);
  const next = addDays(to, 1);

  return {
    from: format(from, "PP"),
    to: format(to, "PP"),
    next: format(next, "PP"),
    distance: formatDistance(now, next),
  };
}
