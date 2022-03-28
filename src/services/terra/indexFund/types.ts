export type AllianceMember = {
  wallet: string;
  name: string;
  logo?: string;
  website?: string;
};

export type AllianceMembersRes = {
  alliance_members: AllianceMember[];
};
