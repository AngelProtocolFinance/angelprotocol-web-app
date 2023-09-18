import { ObjectSchema, object, string } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { OptionType } from "components/Selector";
import { requiredString } from "schemas/string";

type Key = keyof FormValues;
const roleKey: Key = "role";
const referralMethodKey: Key = "referralMethod";

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

const selectorOptionSchema = object<any, SchemaShape<OptionType<string>>>({
  value: string().required("required"),
});

export const schema = object<any, SchemaShape<FormValues>>({
  orgName: requiredString,
  firstName: requiredString,
  lastName: requiredString,
  //email: disabled: already validated at signup
  goals: requiredString,
  role: selectorOptionSchema,
  referralMethod: selectorOptionSchema,
  otherReferralMethod: otherReferralMethod("other"),
  referralCode: otherReferralMethod("referral"),
  otherRole: otherRole,
}) as ObjectSchema<FormValues>;
