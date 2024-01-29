import { requiredString } from "schemas/string";
import { SchemaShape } from "schemas/types";
import { ObjectSchema, object } from "yup";
import { FormValues as FV } from "./types";

export const schema = object<any, SchemaShape<FV>>({
  name: object<any, SchemaShape<FV["name"]>>({
    first: requiredString,
    last: requiredString,
  }),
  address: object<any, SchemaShape<FV["address"]>>({
    street: requiredString,
    //complement: optional
  }),
  city: requiredString,
  postalCode: requiredString,
  country: object<any, SchemaShape<FV["country"]>>({
    name: requiredString,
  }),
  //  usState: no need to validate, optional and preselected
  kycEmail: requiredString.email("invalid"),
}) as ObjectSchema<FV>;
