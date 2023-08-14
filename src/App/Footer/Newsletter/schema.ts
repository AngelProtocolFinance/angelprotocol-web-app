import { ObjectSchema, object, string } from "yup";
import { SchemaShape } from "schemas/types";

export type FormValues = { email: string };

export const schema = object<any, SchemaShape<FormValues>>({
  email: string()
    .email("Invalid email format")
    .required("Please enter your email."),
}) as ObjectSchema<FormValues>;
