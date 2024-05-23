/**
 * put all aws/apes definitions here, if big category exist, separate in a file
 */

const qrTokenTypes = [
  "btc-native",
  "doge-native",
  "sol-native",
  "xrp-native",
] as const;

export type QrTokenType = (typeof qrTokenTypes)[number];

export type TokenType =
  | "juno-native"
  | "terra-native"
  | "evm-native"
  | "erc20"
  | "cw20"
  | "ibc"
  | QrTokenType;

export const isQrToken = (input: TokenType): input is QrTokenType =>
  qrTokenTypes.includes(input as any);

export type Token = {
  approved: boolean; // true
  decimals: number; // 6
  logo: string; // "https://cryptologos.cc/sample/only/lunax.png"
  min_donation_amnt: number;
  symbol: string; // DB Partition key ex., "LunaX"
  token_id: string; // "ujuno" | "0xaSD123..." | "ibc/ASH3438hfd..."
  coingecko_denom: string;
  type: TokenType;
};

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
