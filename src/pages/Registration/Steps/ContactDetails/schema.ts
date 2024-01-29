import { optionType } from "schemas/shape";
import { requiredString } from "schemas/string";
import { SchemaShape } from "schemas/types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { OptionType } from "types/components";
import { ObjectSchema, object, string } from "yup";
import { FormValues } from "./types";

type Key = keyof FormValues;
const roleKey: Key = "Role";
const referralMethodKey: Key = "ReferralMethod";

const otherRole = string().when(roleKey, ([option], schema) =>
  (option as OptionType<ContactRoles>).value === "other"
    ? schema.required("required")
    : schema
);

const otherReferralMethod = (referralMethod: ReferralMethods) =>
  string().when(referralMethodKey, ([option], schema) =>
    (option as OptionType<ReferralMethods>).value === referralMethod
      ? schema.required("required")
      : schema
  );

export const schema = object<any, SchemaShape<FormValues>>({
  OrganizationName: requiredString,
  FirstName: requiredString,
  LastName: requiredString,
  //email: disabled: already validated at signup
  Goals: requiredString,
  Role: optionType({ required: true }),
  ReferralMethod: optionType({ required: true }),
  OtherReferralMethod: otherReferralMethod("other"),
  ReferralCode: otherReferralMethod("referral"),
  OtherRole: otherRole,
}) as ObjectSchema<FormValues>;
