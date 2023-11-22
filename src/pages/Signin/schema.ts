import { InferType, object, string } from "yup";

export const schema = object({
  email: string().required("required").email("invalid email"),
  password: string().required("required"),
});
export type FV = InferType<typeof schema>;
