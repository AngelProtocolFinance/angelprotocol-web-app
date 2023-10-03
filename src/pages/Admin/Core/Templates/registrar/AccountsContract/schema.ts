import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredString, requiredWalletAddr } from "schemas/string";
import { chainIds } from "constant/chainIds";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<FormValues>>({
  ...proposalShape,
  chainName: requiredString,
  contractAddress: requiredWalletAddr(chainIds.polygon),
}) as ObjectSchema<FormValues>;
