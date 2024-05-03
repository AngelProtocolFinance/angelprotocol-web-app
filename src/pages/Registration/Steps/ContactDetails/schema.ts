import { optionType } from "schemas/shape";
import { requiredString } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import type { ContactRoles, ReferralMethods } from "types/aws";
import type { OptionType } from "types/components";
import { type ObjectSchema, object, string } from "yup";
import type { FormValues } from "./types";

type Key = keyof FormValues;
const roleKey: Key = "Role";
const referralMethodKey: Key = "ReferralMethod";

const otherRole = string()
  .trim()
  .when(roleKey, ([option], schema) =>
    (option as OptionType<ContactRoles>).value === "other"
      ? schema.required("required")
      : schema
  );

const otherReferralMethod = (referralMethod: ReferralMethods) =>
  string()
    .trim()
    .when(referralMethodKey, ([option], schema) =>
      (option as OptionType<ReferralMethods>).value === referralMethod
        ? schema.required("required")
        : schema
    );

export const schema = object<any, SchemaShape<FormValues>>({
  OrganizationName: requiredString.trim(),
  FirstName: requiredString.trim(),
  LastName: requiredString.trim(),
  //email: disabled: already validated at signup
  Goals: requiredString.trim(),
  Role: optionType({ required: true }),
  ReferralMethod: optionType({ required: true }),
  OtherReferralMethod: otherReferralMethod("other"),
  ReferralCode: otherReferralMethod("referral"),
  OtherRole: otherRole,
}) as ObjectSchema<FormValues>;
