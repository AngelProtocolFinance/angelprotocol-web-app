import { ObjectSchema, object, string } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { OptionType } from "components/Selector";
import { requiredString } from "schemas/string";

type Key = keyof FormValues;
const roleKey: Key = "role";

const otherOption = string().when(roleKey, ([option], schema) =>
  (option as OptionType<ContactRoles | ReferralMethods>).value === "other"
    ? schema.required("required")
    : schema
);

export const schema = object<any, SchemaShape<FormValues>>({
  orgName: requiredString,
  firstName: requiredString,
  lastName: requiredString,
  //email: disabled: already validated at signup
  goals: requiredString,
  //role - preselected
  //referralMethod - preselected
  otherReferralMethod: otherOption,
  otherRole: otherOption,
}) as ObjectSchema<FormValues>;
