import {
  MAX_RECEIPT_MSG_CHAR,
  increment,
  str,
} from "@better-giving/endowment/schema";
import { donateMethod } from "types/components";
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

export const schema = v.object({
  receiptMsg: v.pipe(
    str,
    v.maxLength(
      MAX_RECEIPT_MSG_CHAR,
      ({ requirement }) => `cannot exceed ${requirement} characters`
    )
  ),
  hide_bg_tip: v.boolean(),
  programDonateDisabled: v.boolean(),
  increments: v.array(increment),
  donateMethods: v.pipe(
    v.array(donateMethod),
    v.filterItems((m) => !m.disabled),
    v.minLength(1, "at least one payment option should be active")
  ),
  target,
});

export type FV = v.InferInput<typeof schema>;
