import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredString } from "schemas/string";

const shape: SchemaShape<FormValues> = {
  name: Yup.object().shape({
    first: requiredString,
    last: requiredString,
  }),
  address: Yup.object().shape({
    street: requiredString,
    //complement: optional
  }),

  city: requiredString,
  postalCode: requiredString,
  country: requiredString,
  email: Yup.string().email("email is invalid").required("email is required"),
};

export const schema = Yup.object().shape(shape);
