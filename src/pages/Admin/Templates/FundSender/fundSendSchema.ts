import { denoms } from "constants/currency";
import { requiredTokenAmount } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { PartialRecord } from "types/types";
import * as Yup from "yup";
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

const fundSendShape: PartialRecord<keyof FundSendValues, Yup.AnySchema> = {
  ...proposalShape,
  amount: requiredTokenAmount,
  recipient: requiredAddress("recipient"),
};

export const fundSendSchema = Yup.object(fundSendShape);
