import { stringByteSchema } from "schemas/schemas";
import * as Yup from "yup";

export const schema = Yup.object().shape({
  title: stringByteSchema("title", 4, 64),
  description: stringByteSchema("description", 4, 128),
  link: stringByteSchema("link", 4, 1024),
});
