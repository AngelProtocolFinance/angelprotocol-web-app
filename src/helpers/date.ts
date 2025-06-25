import { endOfDay, format } from "date-fns";
export { startOfDay, endOfDay } from "date-fns";
import * as v from "valibot";

/** @see {@link https://date-fns.org/v4.1.0/docs/format} */
export function toPP(date: string | Date) {
  return format(new Date(date), "PP");
}

export const iso_date = (formatter: typeof endOfDay, required?: "required") =>
  v.lazy((x) => {
    if (!x) {
      return required === "required"
        ? v.pipe(v.string(), v.nonEmpty("required"))
        : v.string();
    }

    return v.pipe(
      v.string(),
      v.transform((v) => new Date(v)),
      v.date("invalid date"),
      v.maxValue(endOfDay(new Date()), "can't be later than today"),
      v.transform((x) => formatter(x).toISOString())
    );
  });
