import { positiveNumber, tokenAmountString } from "@giving/schemas/number";
import * as Yup from "yup";
import { SchemaShape } from "@giving/schemas/types";
import { FundConfigValues } from "@giving/types/pages/admin";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundConfigValues> = {
  ...proposalShape,
  funding_goal: tokenAmountString,
  fund_member_limit: positiveNumber,
  fund_rotation: positiveNumber,
};

export const schema = Yup.object(shape);
