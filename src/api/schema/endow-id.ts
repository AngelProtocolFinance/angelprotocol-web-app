import * as v from "valibot";

export const endowId = v.pipe(
  v.string(),
  v.transform((x) => +x),
  v.number(),
  v.integer(),
  v.minValue(1)
);
