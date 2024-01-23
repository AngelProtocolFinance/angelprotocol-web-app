import { ObjectSchema, object } from "yup";
import { DonateValues as DV } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenShape } from "schemas/shape";

export const schema = object<any, SchemaShape<DV>>({
  token: object(tokenShape()),
  //no need to validate split, restricted by slider
}) as ObjectSchema<DV>;
