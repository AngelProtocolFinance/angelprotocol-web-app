declare module "@types-slice/admin" {
  import { AllianceMember, Member } from "@types-server/contracts";
  type AllianceMemberWithFlags = AllianceMember & {
    isDeleted: boolean;
    isAdded: boolean;
    edits?: AllianceMember;
  };

  type AddressWithFlags = {
    addr: string;
    isDeleted: boolean;
    isAdded: boolean;
  };
  type MemberCopy = Member & { is_deleted: boolean; is_added: boolean };
}
