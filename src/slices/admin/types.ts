import { ApplicationStatus } from "types/aws";
import { ProposalStatus } from "types/contracts";

export type AddressWithFlags = {
  id: string;
  isDeleted: boolean;
  isAdded: boolean;
};

/** proposals filter */
export type ProposalGroup = "if" | "cw3" | "cw4" | "reg" | "acc";

export type ProposalGroupOptions = ProposalGroup | "all";
export type ProposalStatusOptions = ProposalStatus;
export type ApplicationStatusOptions = ApplicationStatus | "all";
