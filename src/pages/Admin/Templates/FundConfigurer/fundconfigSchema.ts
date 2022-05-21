import * as Yup from "yup";
import { FundConfigValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { positiveNumber, tokenAmountString } from "schemas/number";
import { proposalShape } from "../proposalShape";

const fundConfigShape: SchemaShape<FundConfigValues> = {
  ...proposalShape,
  funding_goal: tokenAmountString,
  fund_member_limit: positiveNumber,
  fund_rotation: positiveNumber,
};

export const fundConfigSchema = Yup.object(fundConfigShape);
