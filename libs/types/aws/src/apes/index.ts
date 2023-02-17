import { NetworkType } from "@/types/lists";
import { WithBalance } from "@/types/utils";
import { ProposalStatus } from "@ap/types/contracts";

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

export type TokenWithBalance = WithBalance<Token> & { gift?: number };

export type BaseChain = {
  chain_id: string;
  chain_name: string; // Avalanche Fuji Testnet
};

export type FetchedChain = BaseChain & {
  block_explorer_url: string; // https://testnet.snowtrace.io
  lcd_url: string; // https://api.avax-test.network/ext/bc/C/rpc
  native_currency: Token;
  network_type: NetworkType;
  rpc_url: string; // https://api.avax-test.network/ext/bc/C/rpc
  tokens: Token[];
  type: "juno-native" | "terra-native" | "evm-native" | "placeholder"; // | "sol" | "btc" | ...
};

export type Chain = Omit<FetchedChain, "native_currency" | "tokens"> & {
  tokens: TokenWithBalance[];
  native_currency: TokenWithBalance;
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

  //from cw3 query
  amount: number;
  symbol: string;
  proposal_status: ProposalStatus;

  //only appears when tx is processed
  num_routes?: number;
  routes?: WithdrawRoute[];
};
