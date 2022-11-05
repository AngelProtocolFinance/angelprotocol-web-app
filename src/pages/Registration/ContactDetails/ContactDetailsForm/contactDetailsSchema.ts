import * as Yup from "yup";
import { ContactDetails } from "pages/Registration/types";
import { SchemaShape } from "schemas/types";
import { stringSchema } from "schemas/string";

export const contactInfoShape: SchemaShape<ContactDetails> = {
  charityName: stringSchema.required(
    "Please enter the name of your organization."
  ),
  firstName: stringSchema.required("Please enter your first name."),
  lastName: stringSchema.required("Please enter your last name"),
  email: stringSchema
    .email("Invalid email format")
    .required("Please enter your email."),
  goals: stringSchema.required(
    "Please state your goal in working with Angel Protocol."
  ),
  // since selector logic has a default value selected, this error message should never appear
  role: stringSchema.required(
    "Please select your role within your organization."
  ),
  otherRole: stringSchema.when("role", {
    is: "other",
    then: stringSchema.required(
      "Please enter your role within your organization."
    ),
  }),
  otherReferralMethod: stringSchema.when("referralMethod", {
    is: "other",
    then: stringSchema.required("Please enter your referral method."),
  }),
  checkedPolicy: Yup.bool().isTrue("Checkbox must be checked"),
};

export const ContactInfoSchema = Yup.object().shape(contactInfoShape);
