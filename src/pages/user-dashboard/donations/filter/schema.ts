import { endOfDay, iso_date, startOfDay } from "helpers/date";
import * as v from "valibot";

export const schema = v.pipe(
  v.object({
    start_date: v.optional(iso_date(startOfDay)),
    end_date: v.optional(iso_date(endOfDay)),
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
