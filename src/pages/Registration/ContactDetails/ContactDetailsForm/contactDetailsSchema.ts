import * as Yup from "yup";
import { ContactDetails } from "pages/Registration/types";
import { SchemaShape } from "schemas/types";
import { asciiSchema } from "schemas/string";

export const contactInfoShape: SchemaShape<ContactDetails> = {
  organizationName: asciiSchema.required(
    "Please enter the name of your organization."
  ),
  firstName: asciiSchema.required("Please enter your first name."),
  lastName: asciiSchema.required("Please enter your last name"),
  email: asciiSchema
    .email("Invalid email format")
    .required("Please enter your email."),
  goals: asciiSchema.required(
    "Please state your goal in working with Angel Protocol."
  ),
  // since selector logic has a default value selected, this error message should never appear
  role: asciiSchema.required(
    "Please select your role within your organization."
  ),
  otherRole: asciiSchema.when("role", {
    is: "other",
    then: asciiSchema.required(
      "Please enter your role within your organization."
    ),
  }),
  otherReferralMethod: asciiSchema.when("referralMethod", {
    is: "other",
    then: asciiSchema.required("Please enter your referral method."),
  }),
  checkedPolicy: Yup.bool().isTrue("Checkbox must be checked"),
};

export const ContactInfoSchema = Yup.object().shape(contactInfoShape);
