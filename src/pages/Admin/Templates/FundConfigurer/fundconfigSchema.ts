import { FundConfig } from "contracts/types";
import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundConfigValues = ProposalBase & FundConfig;

const numberSchema = Yup.lazy((value) =>
  value === ""
    ? Yup.string()
    : Yup.number()
        .typeError("invalid: must be a number")
        .positive("invalid: must be greater than zero ")
        .test("decimals", "invalid: up to 6 decimals only", test_digits)
);
function test_digits(number: number | undefined) {
  return /^\d+(\.\d{1,6})?$/.test((number || "0") as string);
}

const fundConfigShape: PartialRecord<
  keyof FundConfigValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
  funding_goal: numberSchema,
  fund_member_limit: numberSchema,
  fund_rotation: numberSchema,
};

export const fundConfigSchema = Yup.object(fundConfigShape);
