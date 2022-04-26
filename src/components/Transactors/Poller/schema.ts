import { CreatePollValues } from "@types-component/poller";
import { SchemaShape } from "@types-schema";
import * as Yup from "yup";
import { stringByteSchema } from "schemas/string";

const shape: SchemaShape<CreatePollValues> = {
  title: stringByteSchema("title", 4, 64),
  description: stringByteSchema("description", 4, 128),
  link: stringByteSchema("link", 4, 1024),
};

export const schema = Yup.object().shape(shape);
