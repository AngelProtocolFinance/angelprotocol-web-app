import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  password: Yup.string().required("password is required"),
});
