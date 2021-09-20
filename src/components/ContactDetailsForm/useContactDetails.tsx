import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { register_routes } from "types/types";
import { ContactDetails } from "./ContactDetailsForm";
import { ContactDetailsFormSubmit } from "aws-settings.config";
import * as Yup from "yup";

export const ContactInfoSchema = Yup.object().shape({
  charityName: Yup.string().required(
    "Please enter the name of your organization."
  ),
  firstName: Yup.string().required(
    "Please enter the name of your organization."
  ),
  lastName: Yup.string().required(
    "Please enter the name of your organization."
  ),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter the name of your organization."),
  orgRule: Yup.string().required(
    "Please select your role within your organization."
  ),
  phone: Yup.string().matches(
    /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
    "Invalid phone number"
  ),
});

export const useContactDetails = () => {
  const history = useHistory();
  function saveContactInfo(
    contactData: ContactDetails,
    actions: FormikHelpers<ContactDetails>
  ) {
    actions.setSubmitting(true);
    // call API to add or update contact details information(contactData)
    ContactDetailsFormSubmit(contactData);
    localStorage.setItem("userData", JSON.stringify(contactData));
    history.push(register_routes.confirm);
    actions.setSubmitting(false);
  }
  return { saveContactInfo };
};
