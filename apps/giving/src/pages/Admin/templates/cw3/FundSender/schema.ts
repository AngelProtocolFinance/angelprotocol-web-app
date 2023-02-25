import * as Yup from "yup";
import { FundSendValues } from "@giving/types/pages/admin";
import { SchemaShape } from "schemas/types";
import { requiredTokenAmount } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<FundSendValues> = {
  ...proposalShape,
  amount: requiredTokenAmount,
  recipient: requiredWalletAddr(),
};

export const schema = Yup.object(shape);
