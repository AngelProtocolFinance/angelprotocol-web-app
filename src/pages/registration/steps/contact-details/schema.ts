import { _update_contact_fv } from "@better-giving/reg/schema";
import { type InferOutput, forward, partialCheck, pipe } from "valibot";

export const schema = pipe(
  _update_contact_fv, // referral method - referral
  forward(
    partialCheck(
      [["rm"], ["rm_referral_code"]],
      (i) => (i.rm === "referral" ? !!i.rm_referral_code : true),
      "required"
    ),
    ["rm_referral_code"]
  ),
  // referral method - other
  forward(
    partialCheck(
      [["rm"], ["rm_other"]],
      (i) => (i.rm === "other" ? !!i.rm_other : true),
      "required"
    ),
    ["rm_other"]
  ),
  // org role other
  forward(
    partialCheck(
      [["r_org_role"], ["r_org_role_other"]],
      (i) => (i.r_org_role === "other" ? !!i.r_org_role_other : true),
      "required"
    ),
    ["r_org_role_other"]
  )
);

export interface FV extends InferOutput<typeof _update_contact_fv> {}
