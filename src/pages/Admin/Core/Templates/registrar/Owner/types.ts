import { ProposalBase } from "../../../../types";

export type FormValues = ProposalBase & {
  newOwner: string;
  initialOwner: string;
};
