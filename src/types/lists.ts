export type NetworkType = "mainnet" | "testnet";
export type UserTypes = "charity-owner" | "angelprotocol-web-app" | "app-user";
export type DonateClient = "apes" | "normal";
export type Chains = "terra" | "juno" | "ethereum" | "binance" | "polygon";
export type UNSDG_NUMS =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17;

export type ProviderId =
  | "binance-wallet"
  | "metamask"
  | "evm-wc"
  | "xdefi-wallet" //xdefi terra provider
  | "xdefi-evm" //xdefi evm provider
  | "leap-wallet"
  | "station"
  | "walletconnect"
  | "keplr-wc"
  | "keplr"
  | "web3auth-torus";

export type Contract =
  | "registrar"
  | "index-fund"
  | "multisig/ap"
  | "multisig/review"
  | "accounts"
  | "gift-card";

export type AccountType = "liquid" | "locked";
export type TransactionStatus = "open" | "approved" | "expired";
export type EndowmentType = "charity" | "ast" | "daf";
export type BeneficiaryType = "endowment" | "wallet" | "treasury";
