import * as Yup from "yup";
import { SchemaShape } from "types/schema";
import { requiredTokenAmount } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { denoms } from "constants/denoms";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundSendPayload = {
  amount: number;
  recipient: string;

  //metadata
  currency: denoms.uusd | denoms.uhalo;
  haloBalance: number;
  ustBalance: number;
};
export type FundSendValues = ProposalBase & FundSendPayload;

const fundSendShape: SchemaShape<FundSendValues> = {
  ...proposalShape,
  amount: requiredTokenAmount,
  recipient: requiredAddress("recipient"),
};

export const fundSendSchema = Yup.object(fundSendShape);
