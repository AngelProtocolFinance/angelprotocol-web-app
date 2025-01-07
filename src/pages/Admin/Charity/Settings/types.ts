import {
  MAX_RECEIPT_MSG_CHAR,
  increment,
  str,
} from "@better-giving/endowment/schema";
import { target } from "components/goal-selector";
import { donateMethod } from "types/components";
import * as v from "valibot";

export const schema = v.object({
  receiptMsg: v.pipe(
    str,
    v.maxLength(
      MAX_RECEIPT_MSG_CHAR,
      ({ requirement }) => `cannot exceed ${requirement} characters`
    )
  ),
  fundOptIn: v.boolean(),
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
