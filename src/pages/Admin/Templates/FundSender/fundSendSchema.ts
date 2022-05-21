import * as Yup from "yup";
import { FundSendValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredTokenAmount } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { proposalShape } from "../proposalShape";

const fundSendShape: SchemaShape<FundSendValues> = {
  ...proposalShape,
  amount: requiredTokenAmount,
  recipient: requiredAddress("recipient"),
};

export const fundSendSchema = Yup.object(fundSendShape);
