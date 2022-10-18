import { NetworkType } from "types/lists";

/**
 * put all aws/ap definitions here, if big category exist, separate in a file
 */
export interface LeaderboardEntry {
  endowment_id: string;
  owner: string;
  name: string;
  total_liq: number;
  total_lock: number;
  overall: number;
  logo?: string;
  overview: string;
  url: string;
  tier: number;
  iconLight?: boolean;
}

export interface Update {
  endowments: LeaderboardEntry[];
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

export type EndowmentBookmark = {
  id: number;
  name: string;
};

export type UserBookMarkInfo = {
  wallet: string;
  network: NetworkType;
  endowments: EndowmentBookmark[];
};

export interface DonationsMetricList {
  donations_daily_count: number;
  donations_daily_amount: number;
  donations_total_amount: number;
}
