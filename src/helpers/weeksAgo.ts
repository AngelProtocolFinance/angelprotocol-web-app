export function weeksAgo(from: "now" | Date, weeks: number) {
  const date = from === "now" ? new Date() : from;
  date.setDate(date.getDate() - weeks * 7);
  return date;
}
