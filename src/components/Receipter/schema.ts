import * as Yup from "yup";
import { ReceipterValues } from "./types";
import { SchemaShape } from "schemas/types";

const shape: SchemaShape<ReceipterValues> = {
  email: Yup.string().email("email is invalid").required("email is required"),
  fullName: Yup.string().required("full name is required."),
  streetAddress: Yup.string().required("street address is required"),
  city: Yup.string().required("city is required"),
  zipCode: Yup.string().required("zipCode is required"),
  country: Yup.string().required("country is required"),
  consent_marketing: Yup.boolean().oneOf([true]),
  consent_tax: Yup.boolean().oneOf([true]),
};

export const schema = Yup.object().shape(shape);
