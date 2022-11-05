import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { asciiSchema } from "schemas/string";

const shape: SchemaShape<FormValues> = {
  email: asciiSchema.email("email is invalid").required("email is required"),
  fullName: asciiSchema.required("full name is required."),
  streetAddress: asciiSchema.required("street address is required"),
  city: asciiSchema.required("city is required"),
  zipCode: asciiSchema.required("zipCode is required"),
  country: asciiSchema.required("country is required"),
  consent_marketing: Yup.boolean().oneOf([true]),
  consent_tax: Yup.boolean().oneOf([true]),
};

export const schema = Yup.object().shape(shape);
