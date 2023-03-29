export type NetworkType = "mainnet" | "testnet";
export type UserTypes = "charity-owner" | "angelprotocol-web-app" | "app-user";
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
  | "keplr";

export type Contract =
  | "registrar"
  | "index-fund"
  | "cw4/ap"
  | "cw3/ap"
  | "accounts"
  | "accounts/settings"
  | "cw4/review"
  | "cw3/review"
  | "cw4/charity-review"
  | "cw3/charity-review"
  | "cw4/impact-review"
  | "cw3/impact-review"
  | "halo"
  | "gift-card"
  | "gov"
  | "airdrop";
