import { object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { futureDate } from "schemas/date";
import { requiredPositiveNumber } from "schemas/number";
import { stringByteSchema } from "schemas/string";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FormValues> = {
  ...proposalShape,
  name: stringByteSchema(4, 64),
  about: stringByteSchema(4, 1064),
  expiry: object().shape<SchemaShape<FormValues["expiry"]>>({
    time: futureDate,
    height: requiredPositiveNumber,
  }),
};

export const schema = object(shape);
