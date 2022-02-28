import * as Yup from "yup";
export const schema = Yup.object().shape({
  email: Yup.string().email("email is invalid").required("email is required"),
  fullName: Yup.string().required("full name is required."),
  streetAddress: Yup.string().required("street address is required"),
  city: Yup.string().required("city is required"),
  state: Yup.string().required("state is required"),
  zipCode: Yup.string().required("zipCode is required"),
  country: Yup.string().required("country is required"),
});
