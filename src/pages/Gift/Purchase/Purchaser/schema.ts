import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenShape } from "schemas/shape";
import { walletAddr } from "schemas/string";
import { chainIds } from "constant/chainIds";

export const schema = object().shape<SchemaShape<FormValues>>({
  token: object(tokenShape(false)),
  recipient: walletAddr(chainIds.polygon),
}) as ObjectSchema<FormValues>;
