import { denoms } from "constants/currency";
import { addressSchema, tokenAmountSchema } from "schemas/schemas";
import { PartialRecord } from "types/types";
import * as Yup from "yup";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundSendPayload = {
  amount: number;
  receipient: string;

  //metadata
  currency: denoms.uusd | denoms.uhalo;
  haloBalance: number;
  ustBalance: number;
};
export type FundSendValues = ProposalBase & FundSendPayload;

const fundSendShape: PartialRecord<keyof FundSendValues, Yup.AnySchema> = {
  ...proposalShape,
  amount: tokenAmountSchema,
  receipient: addressSchema("receipient"),
};

export const fundSendSchema = Yup.object(fundSendShape);
