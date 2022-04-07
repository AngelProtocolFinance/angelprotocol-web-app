import { requiredPositiveNumber } from "schemas/number";
import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type CW3ConfigPayload = {
  //percent vote to pass poll
  threshold: number;
  //poll duration in block height
  height: number;
};
export type CW3ConfigValues = ProposalBase & CW3ConfigPayload;

const cw3ConfigShape: PartialRecord<
  keyof CW3ConfigValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
  threshold: requiredPositiveNumber,
  height: requiredPositiveNumber,
};

export const cw3ConfigSchema = Yup.object(cw3ConfigShape);
