import * as Yup from "yup";
import { SchemaShape } from "@types-schema";
import { requiredPositiveNumber } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { ProposalBase, proposalShape } from "../proposalShape";

export type MemberUpdatorValues = {
  addr: string;
  weight: string;
} & ProposalBase;

const memberUpdateShape: SchemaShape<MemberUpdatorValues> = {
  ...proposalShape,
  addr: requiredAddress("wallet"),
  weight: requiredPositiveNumber,
};

export const memberUpdatorSchema = Yup.object(memberUpdateShape);
