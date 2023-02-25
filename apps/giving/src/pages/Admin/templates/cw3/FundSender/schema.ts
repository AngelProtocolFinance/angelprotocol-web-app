import { requiredTokenAmount } from "@giving/schemas/number";
import { requiredWalletAddr } from "@giving/schemas/string";
import * as Yup from "yup";
import { SchemaShape } from "@giving/schemas/types";
import { FundSendValues } from "@giving/types/pages/admin";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<FundSendValues> = {
  ...proposalShape,
  amount: requiredTokenAmount,
  recipient: requiredWalletAddr(),
};

export const schema = Yup.object(shape);
