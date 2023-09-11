import { ProposalBase } from "../../../../types";
import { RegistrarConfigUpdate } from "types/contracts";

export type Fields = RegistrarConfigUpdate;
//future fields to edit

export type FormValues = ProposalBase &
  Fields & { initial: RegistrarConfigUpdate };
