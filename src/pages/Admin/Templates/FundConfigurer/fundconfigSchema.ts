import { FundConfig } from "contracts/types";
import { positiveNumber, tokenAmountString } from "schemas/number";
import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundConfigValues = ProposalBase &
  FundConfig & { initialConfigPayload: FundConfig };

const fundConfigShape: PartialRecord<
  keyof FundConfigValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
  funding_goal: tokenAmountString,
  fund_member_limit: positiveNumber,
  fund_rotation: positiveNumber,
};

export const fundConfigSchema = Yup.object(fundConfigShape);
