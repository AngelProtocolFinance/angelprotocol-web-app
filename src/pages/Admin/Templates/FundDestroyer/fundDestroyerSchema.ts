import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundDestroyValues = ProposalBase & { fundId: string };

const fundDestroyerShape: PartialRecord<
  keyof FundDestroyValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
};

export const fundDestroyerSchema = Yup.object(fundDestroyerShape);
