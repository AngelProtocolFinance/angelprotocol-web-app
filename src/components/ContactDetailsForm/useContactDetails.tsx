import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { register } from "types/routes";
import { ContactDetails } from "./ContactDetailsForm";
import { CreateNewCharity } from "aws-settings.config";
import * as Yup from "yup";

export const ContactInfoSchema = Yup.object().shape({
  charityName: Yup.string().required(
    "Please enter the name of your organization."
  ),
  firstName: Yup.string().required("Please enter your first name."),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),

  orgRole: Yup.string().required(
    "Please select your role within your organization."
  ),
  // phone: Yup.string().matches(
  //   /^([0]{1}|\+?[234]{3})([\d])$/g,
  //   "Invalid phone number"
  // ),
});

export const useContactDetails = () => {
  const history = useHistory();
  async function saveContactInfo(
    contactData: ContactDetails,
    actions: FormikHelpers<ContactDetails>
  ) {
    console.log(contactData);
    actions.setSubmitting(true);
    // call API to add or update contact details information(contactData)
    await CreateNewCharity(contactData);
    history.push(register.confirm);
    actions.setSubmitting(false);
  }
  return { saveContactInfo };
};
