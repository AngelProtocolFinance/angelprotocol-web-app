import { denoms } from "constants/currency";
import { addressSchema, tokenAmountSchema } from "schemas/schemas";
import { PartialRecord } from "types/types";
import * as Yup from "yup";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundSendPayload = {
  currency: denoms.uusd | denoms.uhalo;
  amount: number;
  receipient: string;
};
export type FundSendValues = ProposalBase & FundSendPayload;

const fundSendShape: PartialRecord<keyof FundSendValues, Yup.AnySchema> = {
  ...proposalShape,
  amount: tokenAmountSchema,
  receipient: addressSchema("receipient"),
};

export const fundSendSchema = Yup.object(fundSendShape);
