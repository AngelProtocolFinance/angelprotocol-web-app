import { NetworkType } from "../../lists";

/**
 * put all aws/apes definitions here, if big category exist, separate in a file
 */

type TokenType =
  | "juno-native"
  | "terra-native"
  | "evm-native"
  | "erc20"
  | "cw20"
  | "ibc";

export type Token = {
  approved: boolean; // true
  decimals: number; // 6
  logo: string; // "https://cryptologos.cc/sample/only/lunax.png"
  min_donation_amnt: number;
  name: string; // "Stader LunaX Token"
  symbol: string; // DB Partition key ex., "LunaX"
  token_id: string; // "ujuno" | "0xaSD123..." | "ibc/ASH3438hfd..."
  coingecko_denom: string;
  type: TokenType;
};

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
