import { PairInfo, PoolBalance, Simulation } from "types/services/terra/lp";

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
