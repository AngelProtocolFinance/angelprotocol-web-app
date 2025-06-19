export function iso_date(date: Date, end?: boolean) {
  const output = new Date(date);
  //include up to the last second of the day
  if (end) output.setHours(23, 59, 59);

  return output.toISOString();
}
