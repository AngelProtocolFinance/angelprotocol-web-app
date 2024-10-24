import { increment } from "types/aws";
import { donateMethod } from "types/components";
import * as v from "valibot";
import { MAX_RECEIPT_MSG_CHAR } from "./constants";

const str = v.pipe(v.string(), v.trim());
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
});

export type FV = v.InferInput<typeof schema>;
