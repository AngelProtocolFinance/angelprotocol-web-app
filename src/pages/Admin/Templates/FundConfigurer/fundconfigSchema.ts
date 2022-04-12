import { FundConfig } from "contracts/types";
import { positiveNumber, tokenAmountString } from "schemas/number";
import { SchemaShape } from "types/schema";
import * as Yup from "yup";
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
