import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredString, requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FormValues> = {
  ...proposalShape,
  chainName: requiredString,
  contractAddress: requiredWalletAddr(chainIds.polygon),
};

export const schema = Yup.object(shape);
