import {
  contact,
  init,
  orgRole,
  referralMethod,
} from "@better-giving/registration/models";
import {
  type InferOutput,
  type Prettify,
  forward,
  nonEmpty,
  object,
  omit,
  partialCheck,
  pick,
  pipe,
  string,
} from "valibot";

const roleOption = object({
  label: string(),
  value: pipe(orgRole, nonEmpty("required")),
});

export interface RoleOption extends InferOutput<typeof roleOption> {}

const referralOption = object({
  label: string(),
  value: pipe(referralMethod, nonEmpty("required")),
});
export interface ReferralOption extends InferOutput<typeof referralOption> {}

export const schema = pipe(
  object({
    ...omit(contact, ["org_role", "referral_method"]).entries,
    ...pick(init, ["registrant_id"]).entries,
    org_role: roleOption,
    referral_method: referralOption,
  }),
  forward(
    partialCheck(
      [["org_role"], ["other_role"]],
      (inputs) =>
        inputs.org_role.value === "other" ? !!inputs.other_role : true,
      "required"
    ),
    ["other_role"]
  ),
  forward(
    partialCheck(
      [["referral_method"], ["referral_code"]],
      (inputs) =>
        inputs.referral_method.value === "referral"
          ? !!inputs.referral_code
          : true,
      "required"
    ),
    ["referral_code"]
  ),
  forward(
    partialCheck(
      [["referral_method"], ["other_referral_method"]],
      (inputs) =>
        inputs.referral_method.value === "other"
          ? !!inputs.other_referral_method
          : true,
      "required"
    ),
    ["other_referral_method"]
  )
);

export interface FV extends Prettify<InferOutput<typeof schema>> {}
