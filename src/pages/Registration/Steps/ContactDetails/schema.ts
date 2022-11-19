import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { ContactRoles, ReferralMethods } from "types/aws";
import { OptionType } from "components/registration";

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
  orgName: Yup.string().required("Please enter the name of your organization."),
  firstName: Yup.string().required("Please enter your first name."),
  lastName: Yup.string().required("Please enter your last name"),
  //email: disabled: already validated at signup
  goals: Yup.string().required(
    "Please state your goal in working with Angel Protocol."
  ),
  //role - preselected
  //referralMethod - preselected
  otherReferralMethod: otherOption,
  otherRole: otherOption,
});
