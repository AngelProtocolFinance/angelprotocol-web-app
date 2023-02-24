import { SchemaShape } from "@ap/schemas";
import * as Yup from "yup";

export type FormValues = { email: string };

const shape: SchemaShape<FormValues> = {
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),
};

export const schema = Yup.object().shape(shape);
