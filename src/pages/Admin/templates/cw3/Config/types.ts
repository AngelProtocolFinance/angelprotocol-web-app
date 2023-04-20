import { ProposalBase } from "../../../types";
import { MultisigConfig } from "services/types";

export type FormValues = ProposalBase & {
  threshold: string;
  requireExecution: boolean;
  initial: MultisigConfig;
};
