import { ProposalBase } from "../../../../types";

export type FormValues = ProposalBase & {
  newOwner: string;

  //meta
  owner: string;
};
