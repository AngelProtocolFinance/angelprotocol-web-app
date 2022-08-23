import { ApplicationStatus } from "types/server/aws";
import { AllianceMember, Member, ProposalStatus } from "types/server/contracts";

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
export type MemberCopy = Member & { is_deleted: boolean; is_added: boolean };

/** proposals filter */
export type ProposalGroup = "if" | "cw3" | "cw4" | "reg" | "acc";

export type ProposalGroupOptions = ProposalGroup | "all";
export type ProposalStatusOptions = ProposalStatus | "all";
export type ApplicationStatusOptions = ApplicationStatus | "all";
