import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundConfigValues = ProposalBase;

const fundCreatorShape: PartialRecord<
  keyof FundConfigValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
};

export const fundCreatorSchema = Yup.object(fundCreatorShape);
