import * as Yup from "yup";
import { FormValues as FV } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredString } from "schemas/string";

export const schema = Yup.object().shape<SchemaShape<FV>>({
  purchaser: requiredString,
  recipient: Yup.object().shape<SchemaShape<FV["recipient"]>>({
    name: requiredString,
    email: requiredString.email("invalid email"),
  }),
  message: Yup.string(),
});
