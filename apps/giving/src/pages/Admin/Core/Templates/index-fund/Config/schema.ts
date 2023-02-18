import { SchemaShape, positiveNumber, tokenAmountString } from "@ap/schemas";
import * as Yup from "yup";
import { FundConfigValues } from "@/pages/Admin/types";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<FundConfigValues> = {
  ...proposalShape,
  funding_goal: tokenAmountString,
  fund_member_limit: positiveNumber,
  fund_rotation: positiveNumber,
};

export const schema = Yup.object(shape);
