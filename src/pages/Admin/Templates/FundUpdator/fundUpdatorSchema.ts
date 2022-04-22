import * as Yup from "yup";
import { SchemaShape } from "types/schema";
import { requiredAddress } from "schemas/string";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundUpdateValues = ProposalBase & {
  fundId: string;
  newMemberAddr: string;
};

const fundDestroyerShape: SchemaShape<FundUpdateValues> = {
  ...proposalShape,
  newMemberAddr: requiredAddress("endowment"),
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);
