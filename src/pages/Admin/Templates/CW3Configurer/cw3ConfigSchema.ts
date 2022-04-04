import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type CW3ConfigValues = ProposalBase & {
  //percent vote to pass poll
  threshold: number;
  //poll duration in block height
  height: number;
};
const numberSchema = Yup.lazy((value) =>
  value === ""
    ? Yup.string().required("required")
    : Yup.number()
        .typeError("invalid: must be a number")
        .positive("invalid: must be greater than zero")
);

const cw3ConfigShape: PartialRecord<
  keyof CW3ConfigValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
  threshold: numberSchema,
  height: numberSchema,
};

export const cw3ConfigSchema = Yup.object(cw3ConfigShape);
