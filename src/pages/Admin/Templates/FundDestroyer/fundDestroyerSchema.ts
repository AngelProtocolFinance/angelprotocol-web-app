import * as Yup from "yup";
import { SchemaShape } from "types/schema";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundDestroyValues = ProposalBase & { fundId: string };

const fundDestroyerShape: SchemaShape<FundDestroyValues> = {
  ...proposalShape,
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);
