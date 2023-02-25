import { tokenShape } from "@giving/schemas/shape";
import { walletAddr } from "@giving/schemas/string";
import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "@giving/schemas/types";

export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  token: Yup.object().shape(tokenShape),
  recipient: walletAddr(),
});
