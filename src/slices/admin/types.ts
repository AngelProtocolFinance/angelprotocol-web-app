import { ApplicationStatus } from "types/aws";
import { AllianceMember, ProposalStatus } from "types/contracts";

export type AllianceMemberWithFlags = AllianceMember & {
  isDeleted: boolean;
  isAdded: boolean;
  edits?: AllianceMember;
};

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
