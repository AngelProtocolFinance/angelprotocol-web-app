//Index Fund types
export type Donation = { address: string; total_ust: string };
export interface Donors {
  donors: Donation[];
}

//Registrar types
export type SplitConfig = { max: string; min: string; default: string };
export interface SplitRes {
  split_to_liquid: SplitConfig;
}

export type Endowment = { address: string; status: string };
export type Endowments = { endowments: Endowment[] };

//Accounts
export interface Source {
  locked: string; //"0"
  liquid: string; //"0"
  vault: string; //"terra123addr"
}

export interface AccountDetails {
  name: string;
  description: string;
  owner: string;
  others: any;
}

export type Holding = { address: string; amount: string };
export type Balance = {
  total_locked: number;
  total_liq: number;
  overall: number;
};

export interface OwnedBalance extends Balance {
  address: string;
}

export interface Holdings {
  locked_native: Holding[];
  locked_cw20: Holding[];
  liquid_native: Holding[];
  liquid_cw20: Holding[];
  is_placeholder: boolean;
}

//Vaults
export type Swap = { exchange_rate: string; yield_token_supply: string };

//Halo token
export type HaloBalance = {
  balance: string;
};

export type TokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
  total_supply?: string;
  contract_addr?: string;
  icon?: any;
};

//Halo gov
export type Vote = "yes" | "no";

export type PollExecuteMsg = {
  order: number;
  contract: string;
  msg: string;
};

export type GovState = {
  poll_count: number;
  total_share: string;
  total_deposit: string;
};

export type GovStaker = {
  balance: string;
  locked_balance: any[];
  share: string;
};

export type PairsResult = {
  pairs: PairResult[];
};

interface AssetInfo {
  token: { contract_addr: string };
}

interface NativeInfo {
  native_token: { denom: string };
}

export type Infos = {
  info: NativeInfo | AssetInfo;
  start_weight: string;
  end_weight: string;
};

export type PairResult = {
  liquidity_token: string;
  contract_addr: string;
  asset_infos: Infos[];
};

export type Pairs = {
  pairs: Pair[];
};

export type Pair = {
  pair: TokenInfo[];
  contract: string;
  liquidity_token: string;
};

export type EndowmentBalanceData = {
  endowment_address: string;
  locked: number;
  liquid: number;
};
