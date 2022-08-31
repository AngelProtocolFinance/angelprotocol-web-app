import * as Yup from "yup";
import { FundSendValues } from "pages/Admin/types";
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
