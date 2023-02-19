import {
  SchemaShape,
  requiredTokenAmount,
  requiredWalletAddr,
} from "@ap/schemas";
import * as Yup from "yup";
import { FundSendValues } from "@ap/types/admin";
import { proposalShape } from "../../../constants";

const shape: SchemaShape<FundSendValues> = {
  ...proposalShape,
  amount: requiredTokenAmount,
  recipient: requiredWalletAddr(),
};

export const schema = Yup.object(shape);
