export interface MemberDetails {
  name: string;
  address: string;
  url?: string;
  icon?: string;
  iconLight?: boolean;
  otherWallets?: string[];
  isPlaceholder?: true;
}

export type MemberLookUp = {
  [index: MemberDetails["address"]]: Omit<MemberDetails, "address"> | undefined;
};

export type ToRemoveMember = Pick<MemberDetails, "name" | "address">;
