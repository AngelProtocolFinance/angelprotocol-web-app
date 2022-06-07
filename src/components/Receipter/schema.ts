import * as Yup from "yup";
import { SchemaShape } from "schemas/types";
import { ReceipterValues } from "./types";

const shape: SchemaShape<ReceipterValues> = {
  email: Yup.string().email("email is invalid").required("email is required"),
  fullName: Yup.string().required("full name is required."),
  streetAddress: Yup.string().required("street address is required"),
  city: Yup.string().required("city is required"),
  state: Yup.string().required("state is required"),
  zipCode: Yup.string().required("zipCode is required"),
  country: Yup.string().required("country is required"),
};

export const schema = Yup.object().shape(shape);
