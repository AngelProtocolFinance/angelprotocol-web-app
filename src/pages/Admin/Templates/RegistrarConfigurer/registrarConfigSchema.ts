import { RegistrarConfigPayload } from "contracts/types";
import { PartialRecord } from "types/types";
import * as Yup from "yup";
import { ProposalBase, proposalShape } from "../proposalShape";

export type RegistrarConfigValues = ProposalBase & RegistrarConfigPayload;

const registrarConfigShape: PartialRecord<
  keyof RegistrarConfigValues,
  Yup.AnySchema
> = {
  ...proposalShape,
};

export const registrarConfigSchema = Yup.object(registrarConfigShape);
