import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { futureDate } from "schemas/date";
import { requiredPositiveNumber } from "schemas/number";
import { stringByteSchema } from "schemas/string";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<FormValues>>({
  ...proposalShape,
  name: stringByteSchema(4, 64),
  about: stringByteSchema(4, 1064),
  expiryTime: futureDate,
  expiryHeight: requiredPositiveNumber,
}) as ObjectSchema<FormValues>;
