//Block

//Halo token
export type ContractQueryArgs<T = object> = {
  address: string;
  msg: T;
};

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};
type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};

export enum terraTags {
  gov = "gov",
  user = "user",
  halo = "halo",
  lbp = "lbp",
  endowment = "endowment",
  admin = "admin",
  multicall = "multicall",
}
export enum govTags {
  polls = "polls",
  state = "state",
  staker = "staker",
  config = "config",
  halo_balance = "halo_balance",
}
export enum userTags {
  terra_balance = "terra_balance",
  halo_balance = "halo_balance",
}
export enum haloTags {
  info = "info",
}

export enum lbpTags {
  pool = "pool",
}

export enum endowmentTags {
  holdings = "holdings",
  rate = "rate",
  profile = "profile",
}

export enum adminTags {
  proposals = "proposals",
  proposal = "proposal",
  members = "members",
  member = "member",
  votes = "votes",
  applications = "applications",
}

export enum multicallTags {
  endowmentBalance = "endowmentBalance",
  airdrops = "airdrop",
}
