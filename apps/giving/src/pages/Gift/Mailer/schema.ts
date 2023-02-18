import { SchemaShape, requiredString } from "@ap/schemas";
import * as Yup from "yup";
import { FormValues as FV } from "./types";

export const schema = Yup.object().shape<SchemaShape<FV>>({
  purchaser: requiredString,
  recipient: Yup.object().shape<SchemaShape<FV["recipient"]>>({
    name: requiredString,
    email: requiredString.email("invalid email"),
  }),
  message: Yup.string(),
});
