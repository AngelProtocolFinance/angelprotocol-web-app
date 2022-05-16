import * as Yup from "yup";
import { stringByteSchema } from "schemas/string";

export const schema = Yup.object().shape({
  title: stringByteSchema("title", 4, 64),
  description: stringByteSchema("description", 4, 1024),
  link: stringByteSchema("link", 4, 128),
});
