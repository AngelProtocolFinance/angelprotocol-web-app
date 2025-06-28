import { format } from "date-fns";
/** @description - format displayed by input */
export function toYYYMMDD(date: Date) {
  return format(date, "yyyy-MM-dd");
}
