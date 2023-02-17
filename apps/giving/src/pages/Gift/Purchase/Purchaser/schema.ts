import { tokenShape } from "@/schemas/shape";
import { walletAddr } from "@/schemas/string";
import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "@/schemas/types";

export const schema = Yup.object().shape<SchemaShape<FormValues>>({
  token: Yup.object().shape(tokenShape),
  recipient: walletAddr(),
});
