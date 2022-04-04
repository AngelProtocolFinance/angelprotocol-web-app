import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type CW3ConfigValues = ProposalBase;

const fundConfigShape: PartialRecord<
  keyof CW3ConfigValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
};

export const fundConfigSchema = Yup.object(fundConfigShape);
