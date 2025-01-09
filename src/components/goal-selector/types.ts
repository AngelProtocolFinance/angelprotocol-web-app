import * as v from "valibot";
export const target = v.variant("type", [
  v.object({
    type: v.literal("fixed"),
    value: v.pipe(
      v.string("required"),
      v.nonEmpty("required"),
      v.transform((x) => +x),
      v.number("invalid number"),
      v.minValue(0, "must be greater than 0"),
      /** so that the inferred type is string */
      v.transform((x) => x.toString())
    ),
  }),
  v.object({ type: v.literal("smart"), value: v.optional(v.string()) }),
  v.object({ type: v.literal("none"), value: v.optional(v.string()) }),
]);

export type Target = v.InferOutput<typeof target>;
export type TargetType = Target["type"];
