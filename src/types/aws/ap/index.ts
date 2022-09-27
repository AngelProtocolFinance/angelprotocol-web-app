/**
 * put all aws/ap definitions here, if big category exist, separate in a file
 */
export interface Endowment {
  endowment_id: string;
  charity_owner: string;
  charity_name: string;
  total_liq: number;
  total_lock: number;
  overall: number;
  charity_logo?: string;
  charity_overview: string;
  url: string;
  tier: number;
  iconLight?: boolean;
}

export interface Update {
  endowments: Endowment[];
  last_update: string;
}

export type Airdrops = Airdrop[];
export type Airdrop = {
  stage: number;
  haloTokens: string; // uhalo amount
  proof: string[];
  // chainId: "bombay-12";
  // stage: 1;
  // haloTokens: "10000000";
  // proof: string[];
  // claimable: true;
  // address: "terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l";
  // pk: "bombay-12:terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l";
};
