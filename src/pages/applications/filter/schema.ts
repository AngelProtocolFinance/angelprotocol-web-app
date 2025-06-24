import * as v from "valibot";
import { iso_date } from "./helpers";

const d8 = (end = false) =>
  v.pipe(
    v.string(),
    v.transform((x) => (x ? new Date(x) : undefined)),
    v.date("invalid date"),
    v.maxValue(new Date(), "can't be later than today"),
    v.transform((x) => iso_date(x, end))
  );

export const schema = v.pipe(
  v.object({
    start_date: v.optional(d8()),
    end_date: v.optional(d8(true)),
    // not set by user
    country: v.string(),
    // not set by user
    status: v.object({
      label: v.string(),
      value: v.string(),
    }),
  }),
  v.forward(
    v.partialCheck(
      [["start_date"], ["end_date"]],
      ({ start_date: a, end_date: b }) => {
        return a && b ? a <= b : true;
      },
      "start date must be earlier than end date"
    ),
    ["start_date"]
  )
);

export interface FV extends v.InferOutput<typeof schema> {}
