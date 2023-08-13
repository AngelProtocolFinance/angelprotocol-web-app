import { ObjectSchema, object } from "yup";
import { FundSendValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { requiredTokenAmount } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { proposalShape } from "../../../constants";

export const schema = object<any, SchemaShape<FundSendValues>>({
  ...proposalShape,
  amount: requiredTokenAmount,
  recipient: requiredWalletAddr(),
}) as ObjectSchema<FundSendValues>;
