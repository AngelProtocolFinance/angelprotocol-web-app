import * as Yup from "yup";
import { SchemaShape } from "schemas/types";

export type FormValues = { email: string };

const shape: SchemaShape<FormValues> = {
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),
};

export const schema = Yup.object().shape(shape);
