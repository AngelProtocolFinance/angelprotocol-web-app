import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundUpdateValues = ProposalBase & { fundId: string };

const fundDestroyerShape: PartialRecord<
  keyof FundUpdateValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);
