import { requiredString } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import { type ObjectSchema, object } from "yup";
import type { FormValues as FV } from "./types";

export const schema = object<any, SchemaShape<FV>>({
  name: object<any, SchemaShape<FV["name"]>>({
    first: requiredString.trim(),
    last: requiredString.trim(),
  }),
  address: object<any, SchemaShape<FV["address"]>>({
    street: requiredString.trim(),
    //complement: optional
  }),
  city: requiredString.trim(),
  postalCode: requiredString.trim(),
  country: object<any, SchemaShape<FV["country"]>>({
    name: requiredString.trim(),
  }),
  //  usState: no need to validate, optional and preselected
  kycEmail: requiredString.trim().email("invalid"),
}) as ObjectSchema<FV>;
