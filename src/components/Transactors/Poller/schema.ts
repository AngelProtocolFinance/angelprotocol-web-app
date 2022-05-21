import * as Yup from "yup";
import { stringByteSchema } from "schemas/string";
import { SchemaShape } from "schemas/types";
import { CreatePollValues } from "./types";

const shape: SchemaShape<CreatePollValues> = {
  title: stringByteSchema("title", 4, 64),
  description: stringByteSchema("description", 4, 1024),
  link: stringByteSchema("link", 4, 128),
};

export const schema = Yup.object().shape(shape);
