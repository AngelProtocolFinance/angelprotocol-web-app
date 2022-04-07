import { requiredAddress } from "schemas/string";
import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundUpdateValues = ProposalBase & {
  fundId: string;
  newMemberAddr: string;
};

const fundDestroyerShape: PartialRecord<
  keyof FundUpdateValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
  newMemberAddr: requiredAddress("endowment"),
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);
