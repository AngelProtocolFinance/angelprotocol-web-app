import { ProposalStatus } from "../../contracts";
import { SortDirection } from "../ap";

/**
 * put all aws/apes definitions here, if big category exist, separate in a file
 */

export type Token = {
  approved: boolean; // true
  decimals: number; // 6
  logo: string; // "https://cryptologos.cc/sample/only/lunax.png"
  min_donation_amnt: number;
  name: string; // "Stader LunaX Token"
  symbol: string; // DB Partition key ex., "LunaX"
  token_id: string; // "ujuno" | "0xaSD123..." | "ibc/ASH3438hfd..."
  type:
    | "juno-native"
    | "terra-native"
    | "evm-native"
    | "erc20"
    | "cw20"
    | "ibc"
    | "placeholder";
};

export type FetchedChain = {
  chain_id: string;
  chain_name: string; // Avalanche Fuji Testnet
  native_currency: Token;
  tokens: Token[];
};

export type RouteStatus = "OK" | "DEPOSIT_CONFIRMED" | "PENDING";
export type RouterId = "axelar" | "connext";

export type WithdrawRoute = {
  id: RouterId;
  output_symbol: string;
  output_amount: number;
  status: RouteStatus;
  hash: string;
};

export type WithdrawLog = {
  //when submitted, already available
  //from POST payload
  endowment_multisig: string;
  proposal_id: number;
  proposal_chain_id: string;
  target_wallet: string;
  target_chain: string;
  start_time: string;

  //from cw3 query
  amount: number;
  symbol: string;
  proposal_status: ProposalStatus;

  //only appears when tx is processed
  num_routes?: number;
  routes?: WithdrawRoute[];
};

export type WithdrawLogSortKey = Extract<
  keyof WithdrawLog,
  "start_time" | "amount"
>;

export type WithdrawLogQueryParams = {
  cw3: string; // CW3 address
  sort: "default" | `${WithdrawLogSortKey}+${SortDirection}`;
  start?: number; //to load next page, set start to ItemCutOff + 1
  limit?: number; // Number of items to be returned per request. If not provided, API defaults to return all
  proposal_status?: string | null; // comma separated ProposalStatus values
};
