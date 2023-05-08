import { object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenShape } from "schemas/shape";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<FormValues> = {
  ...proposalShape,
  token: object().shape(tokenShape(false)),
  recipient: requiredWalletAddr(chainIds.polygon),
};

export const schema = object(shape);
