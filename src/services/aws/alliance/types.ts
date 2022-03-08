export interface MemberDetails {
  name: string;
  address: string;
  url?: string;
  icon?: string;
  iconLight?: boolean;
  otherWallets?: string[];
}

export type ToRemoveMember = Pick<MemberDetails, "name" | "address">;
