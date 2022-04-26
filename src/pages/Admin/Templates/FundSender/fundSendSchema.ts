import * as Yup from "yup";
import { Denoms } from "@types-lists";
import { SchemaShape } from "@types-schema";
import { requiredTokenAmount } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundSendPayload = {
  amount: number;
  recipient: string;

  //metadata
  currency: Extract<Denoms, "uusd" | "uhalo">;
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
