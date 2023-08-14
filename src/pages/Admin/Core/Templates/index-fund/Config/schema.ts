import { ObjectSchema, object } from "yup";
import { FundConfigValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { positiveNumber, tokenAmountString } from "schemas/number";
import { proposalShape } from "../../../../constants";

export const schema = object<any, SchemaShape<FundConfigValues>>({
  ...proposalShape,
  funding_goal: tokenAmountString,
  fund_member_limit: positiveNumber,
  fund_rotation: positiveNumber,
}) as ObjectSchema<FundConfigValues>;
