import { TokenInfo } from "contracts/types";
import {
  GovConfig,
  GovStaker,
  GovState,
  PairInfo,
  Poll,
  PollStatus,
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

export const pairInfo: PairInfo = {
  asset_infos: [
    {
      info: {
        token: {
          contract_addr: "terra1a2u20znw23hax47dmx6amuf33kk59pmg4q3ayq",
        },
      },
      start_weight: "96",
      end_weight: "50",
    },
    {
      info: {
        native_token: {
          denom: "uusd",
        },
      },
      start_weight: "4",
      end_weight: "50",
    },
  ],
  token_code_id: 25641,
  start_time: 1638974838,
  end_time: 1639234038,
  commission_rate: "0.03",
  collector_addr: "terra1wlr3fq2thnkzxw2flagle8w6yl52vx46mgrm5l",
  split_to_collector: "0.01",
};
