import * as Yup from "yup";

export type ContactDetails = {
  charityName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orgRole: string;
  otherRole: string;
  checkedPolicy: boolean;
  uniqueID: string;
};

export const ContactInfoSchema = Yup.object().shape({
  charityName: Yup.string().required(
    "Please enter the name of your organization."
  ),
  firstName: Yup.string().required("Please enter your first name."),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),
  // since selector logic has a default value selected, this error message should never appear
  orgRole: Yup.string().required(
    "Please select your role within your organization."
  ),
  checkedPolicy: Yup.bool().isTrue("Checkbox must be checked"),
});
