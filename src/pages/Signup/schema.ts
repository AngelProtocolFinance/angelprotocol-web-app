import { InferType, object, string } from "yup";

export const schema = object({
  firstName: string().required("required"),
  lastName: string().required("required"),
  email: string().required("required").email("invalid email"),
  password: string()
    .required("required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "must contain at least one lowercase letter")
    .matches(/[A-Z]/, "contain at least one uppercase letter")
    .matches(/\d/, "must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "must contain at least one special character"
    ),
  passwordConfirmation: string()
    .required("required")
    .when(["password"], ([password], schema) =>
      schema.matches(password, "password doesn't match")
    ),
});
export type FV = InferType<typeof schema>;
