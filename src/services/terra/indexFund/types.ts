export type AllianceMember = {
  wallet: string;
  name: string;
  logo?: string;
  website?: string;
};

export type AllianceMembersRes = {
  alliance_members: AllianceMember[];
};

export type IndexFundConfig = {
  owner: string; //"terra123abc.."
  registrar_contract: string; //"terra123abc";
  fund_rotation: number; //10
  fund_member_limit: number; //10
  funding_goal: string; //"50000000"
  accepted_tokens: {
    native: string[]; //["uusd"]
    cw20: string[]; //
  };
};
