import { ApplicationStatus } from "types/aws";
import { AllianceMember, CW4Member, ProposalStatus } from "types/contracts";

export type AllianceMemberWithFlags = AllianceMember & {
  isDeleted: boolean;
  isAdded: boolean;
  edits?: AllianceMember;
};

export type AddressWithFlags = {
  addr: string;
  isDeleted: boolean;
  isAdded: boolean;
};
export type MemberCopy = CW4Member & { is_deleted: boolean; is_added: boolean };

/** proposals filter */
export type ProposalGroup = "if" | "cw3" | "cw4" | "reg" | "acc";

export type ProposalGroupOptions = ProposalGroup | "all";
export type ProposalStatusOptions = ProposalStatus | "all";
export type ApplicationStatusOptions = ApplicationStatus | "all";
