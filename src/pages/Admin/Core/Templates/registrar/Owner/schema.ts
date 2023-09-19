import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constant/chainIds";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<FormValues>>({
  ...proposalShape,
  newOwner: requiredWalletAddr(chainIds.polygon),
}) as ObjectSchema<FormValues>;
