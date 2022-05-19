import * as Yup from "yup";
import { ContactDetails } from "@types-page/registration";
import { SchemaShape } from "@types-schema";

export const contactInfoShape: SchemaShape<ContactDetails> = {
  charityName: Yup.string().required(
    "Please enter the name of your organization."
  ),
  firstName: Yup.string().required("Please enter your first name."),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),
  goals: Yup.string().required(
    "Please state your goal in working with Angel Protocol."
  ),
  // since selector logic has a default value selected, this error message should never appear
  role: Yup.string().required(
    "Please select your role within your organization."
  ),
  otherRole: Yup.string().when("role", {
    is: "other",
    then: Yup.string().required(
      "Please enter your role within your organization."
    ),
  }),
  otherReferralMethod: Yup.string().when("referralMethod", {
    is: "other",
    then: Yup.string().required("Please enter your referral method."),
  }),
  checkedPolicy: Yup.bool().isTrue("Checkbox must be checked"),
};

export const ContactInfoSchema = Yup.object().shape(contactInfoShape);
