import { org_role, referral_method } from "@better-giving/reg/schema";
import { $, $req } from "@better-giving/schemas";
import {
  type InferOutput,
  type Prettify,
  email,
  forward,
  object,
  optional,
  partialCheck,
  pipe,
} from "valibot";

const schema_raw = object({
  r_first_name: $req,
  r_last_name: $req,
  r_contact_number: optional($),
  r_email: pipe($, email()),
  r_org_role: org_role,
  r_org_role_other: optional($),
  org_name: $req,
  rm: referral_method,
  rm_other: optional($),
  rm_referral_code: optional($),
});

export const schema = pipe(
  schema_raw, // referral method - referral
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

export interface FV extends Prettify<InferOutput<typeof schema_raw>> {}
