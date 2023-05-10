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

export type NewFund = {
  name: string;
  description: string;
  members: string[]; //uint256[]
  rotatingFund: boolean;
  splitToLiquid: string; // "1-100"
  expiryTime: string; // uint256
  expiryHeight: string; // uint256
};

export type IndexFundConfigUpdate = {
  fundRotation: number;
  fundMemberLimit: number;
  fundingGoal: number;
};

export type AllianceListUpdate = {
  address: string;
  action: "add" | "remove";
};

export type FundMemberUpdate = {
  fundId: number;
  add: number[];
  remove: number[];
};
