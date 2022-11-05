import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { stringSchema } from "schemas/string";

const shape: SchemaShape<FormValues> = {
  email: stringSchema.email("email is invalid").required("email is required"),
  fullName: stringSchema.required("full name is required."),
  streetAddress: stringSchema.required("street address is required"),
  city: stringSchema.required("city is required"),
  zipCode: stringSchema.required("zipCode is required"),
  country: stringSchema.required("country is required"),
  consent_marketing: Yup.boolean().oneOf([true]),
  consent_tax: Yup.boolean().oneOf([true]),
};

export const schema = Yup.object().shape(shape);
