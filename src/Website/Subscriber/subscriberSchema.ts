import * as Yup from "yup";

export const subscriberSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
});
