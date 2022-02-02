import * as Yup from "yup";

export const schema = Yup.object().shape({
  transactionId: Yup.string().typeError("TransactionId is invalid"),
  email: Yup.string().email("Email is invalid").required("Email is necessary."),
  fullName: Yup.string().required("Full Name is necessary."),
  streetAddress: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("ZipCode is required"),
  country: Yup.string().required("Country is required"),
});
