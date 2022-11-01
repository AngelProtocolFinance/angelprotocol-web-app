import * as Yup from "yup";
import { CreatePollValues } from "./types";
import { SchemaShape } from "schemas/types";
import { stringByteSchema } from "schemas/string";

const shape: SchemaShape<CreatePollValues> = {
  title: stringByteSchema(4, 64),
  description: stringByteSchema(4, 1024),
  link: stringByteSchema(4, 128),
};

export const schema = Yup.object().shape(shape);
