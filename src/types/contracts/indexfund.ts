export type AllianceMember = {
  wallet: string;
  name: string;
  logo?: string;
  website?: string;
};

export type IndexFundConfig = {
  owner: string; //"juno123abc.."
  registrar_contract: string; //"juno123abc..";
  fund_rotation?: number; //10
  fund_member_limit: number; //10
  funding_goal?: string; //"50000000"
  accepted_tokens: {
    native: string[]; //["ujuno"]
    cw20: string[]; //
  };
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

export interface FundConfig {
  fund_rotation?: number;
  fund_member_limit?: number;
  funding_goal?: string;
}
