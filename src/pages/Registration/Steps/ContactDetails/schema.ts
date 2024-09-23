import type { ReferralMethod, Role } from "@better-giving/registration/models";
import { optionType } from "schemas/shape";
import { requiredString } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import type { OptionType } from "types/components";
import { type ObjectSchema, object, string } from "yup";
import type { FormValues } from "./types";

type Key = keyof FormValues;
const roleKey: Key = "org_role";
const referralMethodKey: Key = "referral_method";

const otherRole = string()
  .trim()
  .when(roleKey, ([option], schema) =>
    (option as OptionType<Role>).value === "other"
      ? schema.required("required")
      : schema
  );

const otherReferralMethod = (referralMethod: ReferralMethod) =>
  string()
    .trim()
    .when(referralMethodKey, ([option], schema) =>
      (option as OptionType<ReferralMethod>).value === referralMethod
        ? schema.required("required")
        : schema
    );

export const schema = object<any, SchemaShape<FormValues>>({
  org_name: requiredString.trim(),
  first_name: requiredString.trim(),
  last_name: requiredString.trim(),
  //email: disabled: already validated at signup
  goals: requiredString.trim(),
  org_role: optionType({ required: true }),
  referral_method: optionType({ required: true }),
  other_referral_method: otherReferralMethod("other"),
  referral_code: otherReferralMethod("referral"),
  other_role: otherRole,
}) as ObjectSchema<FormValues>;
