export type EndowmentBalance = {
  liquid: number; //prettified USD value $1,000
  locked: number;
  total: number;
};

export type RateLookUp = { [index: string]: string };

export type ClaimInquiry = {
  is_claimed: boolean;
};
export type Airdrop = {
  stage: number;
  haloTokens: string; // uhalo amount
  proof: string[];
};
export type Airdrops = Airdrop[];
