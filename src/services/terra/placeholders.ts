import { Holdings, TokenInfo } from "contracts/types";
import {
  GovConfig,
  GovStaker,
  GovState,
  PairInfo,
  Poll,
  PollStatus,
  PoolBalance,
  Simulation,
} from "./types";

export const halo_info: TokenInfo = {
  name: "",
  symbol: "",
  decimals: 0,
  total_supply: "0",
};
export const staker: GovStaker = {
  balance: "0",
  share: "0",
  locked_balance: [],
};
export const poll: Poll = {
  id: 0,
  creator: "",
  status: PollStatus.in_progress,
  end_height: 0,
  title: "",
  description: ".",
  link: "",
  deposit_amount: "0",
  execute_data: "",
  yes_votes: "0",
  no_votes: "0",
  staked_amount: "0",
  total_balance_at_end_poll: "0",
};
export const gov_state: GovState = {
  poll_count: 0,
  total_share: "0",
  total_deposit: "0",
};
export const gov_config: GovConfig = {
  owner: "",
  halo_token: "",
  quorum: "0",
  threshold: "0",
  voting_period: 0,
  timelock_period: 0,
  proposal_deposit: "0",
  snapshot_period: 0,
};

//lbp
const token_info = {
  info: {
    token: {
      contract_addr: "terra1aw8704nry2gaemjur65j3ervpxtvt0s2lj2jw9",
    },
  },
  amount: "0",
  start_weight: "96",
  end_weight: "50",
};

const native_info = {
  info: {
    native_token: {
      denom: "uusd",
    },
  },
  amount: "0",
  start_weight: "4",
  end_weight: "50",
};

export const pairInfo: PairInfo = {
  asset_infos: [token_info, native_info],
  token_code_id: 25641,
  start_time: 1938974838,
  end_time: 1939234038,
  commission_rate: "0.02",
};

export const simulation: Simulation = {
  return_amount: "1000000",
  spread_amount: "0",
  commission_amount: "0",
  is_placeholder: true,
};

export const pool_balance: PoolBalance = {
  token: "0",
  native_token: "0",
  is_placeholder: true,
};

export const holdings: Holdings = {
  locked_cw20: [],
  locked_native: [],
  liquid_cw20: [],
  liquid_native: [],
  is_placeholder: true,
};
