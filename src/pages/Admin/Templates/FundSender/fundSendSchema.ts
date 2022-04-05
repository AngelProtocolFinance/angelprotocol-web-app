import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type FundSendValues = ProposalBase;

const fundSendShape: PartialRecord<
  keyof FundSendValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
};

export const fundSendSchema = Yup.object(fundSendShape);
