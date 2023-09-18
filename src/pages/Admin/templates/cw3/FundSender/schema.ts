import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenShape } from "schemas/shape";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../constants";

export const schema = object<any, SchemaShape<FormValues>>({
  ...proposalShape,
  token: object(tokenShape(false)),
  recipient: requiredWalletAddr(chainIds.polygon),
}) as ObjectSchema<FormValues>;
