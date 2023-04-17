export type IndexFundConfig = {
  owner: string;
  registrarContract: string;
  fundRotation: number;
  fundMemberLimit: number;
  fundingGoal: number;
  alliance_members: string[];
};

export type FundDetails = {
  id: number;
  name: string;
  description: string;
  members: number[];
  rotatingFund: boolean;
  splitToLiquid: number; //1-100
  expiryTime: number;
  expiryHeight: number;
};

export type IndexFundOwnerPayload = {
  new_owner: string;
};
