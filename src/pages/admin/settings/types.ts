import { $, MAX_RECEIPT_MSG_CHAR } from "@better-giving/endowment/schema";
import { MAX_NUM_INCREMENTS, increment } from "@better-giving/schemas";
import { target } from "components/goal-selector";
import { donate_method } from "types/components";
import * as v from "valibot";

export const schema = v.object({
  receiptMsg: v.pipe(
    $,
    v.maxLength(
      MAX_RECEIPT_MSG_CHAR,
      ({ requirement }) => `cannot exceed ${requirement} characters`
    )
  ),
  fundOptIn: v.boolean(),
  hide_bg_tip: v.boolean(),
  programDonateDisabled: v.boolean(),
  increments: v.pipe(
    v.array(increment),
    v.maxLength(
      MAX_NUM_INCREMENTS,
      ({ requirement }) => `cannot have more than ${requirement} increments`
    )
  ),
  donateMethods: v.pipe(
    v.array(donate_method),
    v.filterItems((m) => !m.disabled),
    v.minLength(1, "at least one payment option should be active")
  ),
  target,
});

export type FV = v.InferInput<typeof schema>;
