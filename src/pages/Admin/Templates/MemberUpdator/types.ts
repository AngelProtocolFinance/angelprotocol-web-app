import { Member } from "services/terra/admin/types";

export type Values = {
  weight: string;
  addr: string;
};

export type MemberCopy = Member & { is_deleted: boolean; is_added: boolean };
export type MemberUpdateFn = (actual: MemberCopy) => () => void;

export type Diffs = [Member[], string[]];
