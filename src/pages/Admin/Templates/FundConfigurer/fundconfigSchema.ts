import { SchemaShape } from "@types-schema";
import { FundConfig } from "@types-server/contracts";
import * as Yup from "yup";
import { positiveNumber, tokenAmountString } from "schemas/number";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundConfigValues = ProposalBase &
  FundConfig & { initialConfigPayload: FundConfig };

const fundConfigShape: SchemaShape<FundConfigValues> = {
  ...proposalShape,
  funding_goal: tokenAmountString,
  fund_member_limit: positiveNumber,
  fund_rotation: positiveNumber,
};

export const fundConfigSchema = Yup.object(fundConfigShape);
