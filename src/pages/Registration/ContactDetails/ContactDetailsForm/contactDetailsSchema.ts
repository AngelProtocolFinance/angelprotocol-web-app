import * as Yup from "yup";
import { ContactValues } from "@types-page/registration";
import { SchemaShape } from "@types-schema";

const contactInfoShape: SchemaShape<ContactValues> = {
  charityName: Yup.string().required(
    "Please enter the name of your organization."
  ),
  firstName: Yup.string().required("Please enter your first name."),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),
  // since selector logic has a default value selected, this error message should never appear
  role: Yup.string().required(
    "Please select your role within your organization."
  ),
  otherRole: Yup.string().when("orgRole", {
    is: "other",
    then: Yup.string().required(
      "Please enter your role within your organization."
    ),
  }),
  checkedPolicy: Yup.bool().isTrue("Checkbox must be checked"),
};

export const ContactInfoSchema = Yup.object().shape(contactInfoShape);
