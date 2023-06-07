import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FormValues> = {
  ...proposalShape,
  token: requiredWalletAddr(chainIds.polygon),
};

export const schema = Yup.object(shape);
