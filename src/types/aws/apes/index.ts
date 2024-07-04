/**
 * put all aws/apes definitions here, if big category exist, separate in a file
 */

export type QrTokenType =
  | "btc-native"
  | "doge-native"
  | "sol-native"
  | "xrp-native";

export type TokenType =
  | "juno-native"
  | "stargaze-native"
  | "osmosis-native"
  | "kujira-native"
  | "terra-native"
  | "evm-native"
  | "erc20"
  | "cw20"
  | "ibc"
  | QrTokenType;

export type Token = {
  approved: boolean; // true
  decimals: number; // 6
  logo: string; // "https://cryptologos.cc/sample/only/lunax.png"
  min_donation_amnt: number;
  symbol: string; // DB Partition key ex., "LunaX"
  name: string;
  /**
   * EVM: contract address - e.g. `0xaSD123...`
   * COSMOS: denom - e.g. `ibc/ASH3438hfd...`
   */
  token_id: string;
  /** e.g. `matic-network` */
  coingecko_denom: string;
  type: TokenType;
};

export interface Chain<T extends string> {
  id: T;
  nodeUrl: string;
  nativeToken: Pick<
    Token,
    "token_id" | "decimals" | "symbol" | "coingecko_denom"
  > & {
    nodeUrl: string;
  };
}

export type EndowmentBalances = {
  contributionsCount: number;
  donationsBal: number;
  payoutsMade: number;
  payoutsPending: number;
  sustainabilityFundBal: number;
  totalContributions: number;
  totalEarnings: number;
};

export * from "./paypal";
