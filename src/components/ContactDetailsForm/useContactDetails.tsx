import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { register_routes } from "types/types";
import { ContactDetails } from "./ContactDetailsFrom";

export const useContactDetails = () => {
  const history = useHistory();
  function saveContactInfo(
    contactData: ContactDetails,
    actions: FormikHelpers<ContactDetails>
  ) {
    actions.setSubmitting(true);
    // call API to add or update contact details information(contactData)
    localStorage.setItem("userData", JSON.stringify(contactData));
    history.push(register_routes.confirm);
    actions.setSubmitting(false);
  }

  const validation = (values: ContactDetails) => {
    const errors: any = {};
    if (!values.charityName) {
      errors.charityName = "Please enter the name of your organization.";
    }
    if (!values.firstName) {
      errors.firstName = "Please enter your first name.";
    }
    if (!values.lastName) {
      errors.lastName = "Please enter your last name.";
    }
    if (
      !values.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Please enter correct email address.";
    }
    if (!values.orgRule) {
      errors.orgRule = "Please select your role within your organization.";
    }
    return errors;
  };

  return { saveContactInfo, validation };
};
