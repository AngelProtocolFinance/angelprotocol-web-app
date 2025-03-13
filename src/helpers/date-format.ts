import { format } from "date-fns";

/** @see {@link https://date-fns.org/v4.1.0/docs/format} */
export function dateFormat(date: string | Date) {
  const localeDate = new Date(date).toLocaleDateString();
  return format(localeDate, "PP");
}
