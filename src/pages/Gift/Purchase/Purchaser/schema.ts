import { tokenShape } from "schemas/shape";
import { walletAddr } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import { type ObjectSchema, object } from "yup";
import type { FormValues } from "./types";

export const schema = object().shape<SchemaShape<FormValues>>({
  token: object(tokenShape(false)),
  recipient: walletAddr("137"), //any evm-compatible chain
}) as ObjectSchema<FormValues>;
