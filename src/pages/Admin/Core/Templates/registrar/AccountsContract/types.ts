import { ProposalBase } from "../../../../types";

export type FormValues = ProposalBase & {
  chainName: string;
  contractAddress: string;
};
