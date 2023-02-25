import { OptionType } from "@giving/components/Selector";
import { requiredString } from "@giving/schemas/string";
import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "@giving/schemas/types";
import { ContactRoles, ReferralMethods } from "@giving/types/aws";

type Key = keyof FormValues;
const roleKey: Key = "role";

const otherOption = Yup.string().when(
  roleKey,
  (
    option: OptionType<ContactRoles | ReferralMethods>,
    schema: Yup.StringSchema
  ) => {
    return option.value === "other" ? schema.required("required") : schema;
  }
);

export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  orgName: requiredString,
  firstName: requiredString,
  lastName: requiredString,
  //email: disabled: already validated at signup
  goals: requiredString,
  //role - preselected
  //referralMethod - preselected
  otherReferralMethod: otherOption,
  otherRole: otherOption,
});
