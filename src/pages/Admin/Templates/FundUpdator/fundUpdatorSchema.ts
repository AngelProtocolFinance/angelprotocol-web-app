import { requiredAddress } from "schemas/string";
import { SchemaShape } from "types/schema";
import * as Yup from "yup";
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
