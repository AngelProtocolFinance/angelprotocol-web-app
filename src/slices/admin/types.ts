import { ApplicationStatus } from "types/aws";
import { TransactionStatus } from "types/lists";

export type AddressWithFlags = {
  id: string;
  isDeleted: boolean;
  isAdded: boolean;
};

/** proposals filter */
export type ProposalGroup = "if" | "cw3" | "cw4" | "reg" | "acc";

export type ProposalGroupOptions = ProposalGroup | "all";
export type ProposalStatusOptions = TransactionStatus | "all";
export type ApplicationStatusOptions = ApplicationStatus | "all";
