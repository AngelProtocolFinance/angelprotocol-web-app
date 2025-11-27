import { $num_gt0_fn } from "@better-giving/schemas";
import { iso_date } from "@better-giving/schemas/date";
import { endOfDay, startOfDay } from "date-fns";
import * as v from "valibot";

const interest_log_raw = v.object({
  date_created: iso_date(endOfDay, "required"),
  total: $num_gt0_fn({ required: true }),
  date_start: iso_date(startOfDay, "required"),
  date_end: iso_date(endOfDay, "required"),
});

export interface IInterestLog extends v.InferOutput<typeof interest_log_raw> {}

export const interest_log = v.pipe(
  interest_log_raw,
  v.forward(
    v.partialCheck(
      [["date_start"], ["date_end"]],
      ({ date_start: a, date_end: b }) => {
        return a && b ? a <= b : true;
      },
      "start date must be earlier than end date"
    ),
    ["date_start"]
  )
);
