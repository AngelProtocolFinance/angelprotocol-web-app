import * as Yup from "yup";
import { ContactRoles, ReferralMethods } from "../../constants";

export type ContactDetails = {
  charityName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referralMethod: ReferralMethods;
  otherReferralMethod: string;
  role: ContactRoles;
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
});
