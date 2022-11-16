import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { asciiSchema } from "schemas/string";

export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  orgName: asciiSchema.required("Please enter the name of your organization."),
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
  referralMethod: asciiSchema.required(
    "Please select your role within your organization."
  ),
});
