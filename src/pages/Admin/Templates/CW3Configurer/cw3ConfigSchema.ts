import * as Yup from "yup";
import { SchemaShape } from "types/schema";
import { requiredPositiveNumber } from "schemas/number";
import { ProposalBase, proposalShape } from "../proposalShape";

export type CW3ConfigPayload = {
  //percent vote to pass poll
  threshold: number;
  //poll duration in block height
  height: number;
};
export type CW3ConfigValues = ProposalBase &
  CW3ConfigPayload & { initialCW3Config: CW3ConfigPayload };

const cw3ConfigShape: SchemaShape<CW3ConfigValues> = {
  ...proposalShape,
  threshold: requiredPositiveNumber,
  height: requiredPositiveNumber,
};

export const cw3ConfigSchema = Yup.object(cw3ConfigShape);
