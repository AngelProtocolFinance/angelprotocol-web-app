import { WithoutInstallers } from "./types";
import { BaseChain } from "types/aws";
import { Chain } from "types/tx";
import { chainIDs } from "constants/chains";
import { EXPECTED_NETWORK_TYPE, IS_TEST } from "constants/env";

const tokenLogo = "/icons/currencies/token.svg";
const binanceWalletIcon = "/icons/wallets/binance.png";
const keplrIcon = "/icons/wallets/keplr.png";
const metamaskIcon = "/icons/wallets/metamask.png";
const xdefiIcon = "/icons/wallets/xdefi.jpg";

export const WALLET_METADATA: {
  [key in WithoutInstallers]: {
    logo: string;
    installUrl: string;
    name: string;
  };
} = {
  "binance-wallet": {
    logo: binanceWalletIcon,
    installUrl: "https://www.bnbchain.org/en/binance-wallet",
    name: "Binance Wallet",
  },
  metamask: {
    logo: metamaskIcon,
    installUrl: "https://metamask.io/",
    name: "Metamask",
  },
  "evm-wc": {
    logo: metamaskIcon,
    installUrl: "https://metamask.io/",
    name: "Metamask",
  },
  "xdefi-wallet": {
    logo: xdefiIcon,
    installUrl: "https://www.xdefi.io/",
    name: "XDEFI",
  },
  "xdefi-evm": {
    logo: xdefiIcon,
    installUrl: "https://www.xdefi.io/",
    name: "XDEFI",
  },
  keplr: {
    logo: keplrIcon,
    installUrl: "https://www.keplr.app/",
    name: "Keplr",
  },
  "keplr-wc": {
    logo: keplrIcon,
    installUrl: "https://www.keplr.app/",
    name: "Keplr",
  },
};

export const placeholderChain: Chain = {
  block_explorer_url: "https://www.placeholder.io/token/txs/",
  chain_id: "placeholder",
  chain_name: "placeholder",
  native_currency: {
    type: "evm-native",
    symbol: "NATIVE",
    logo: tokenLogo,
    decimals: 18,
    balance: 0,
    approved: true,
    name: "Native",
    token_id: "unative",
    min_donation_amnt: 0.01,
    coingecko_denom: "",
  },
  network_type: EXPECTED_NETWORK_TYPE,
  rpc_url: "https://rpc-token.placeholder.com",
  lcd_url: "https://lcd-token.placeholder.com",
  tokens: [
    {
      type: "erc20",
      symbol: "TOKEN",
      logo: tokenLogo,
      decimals: 18,
      balance: 0,
      approved: true,
      name: "Token",
      token_id: "utoken",
      min_donation_amnt: 0.01,
      coingecko_denom: "",
    },
  ],
  type: "placeholder",
};

export const BNB_WALLET_SUPPORTED_CHAINS: BaseChain[] = IS_TEST
  ? [{ chain_id: chainIDs.binanceTest, chain_name: "BNB Smart Chain Testnet" }]
  : [{ chain_id: chainIDs.binanceMain, chain_name: "BNB Smart Chain Mainnet" }];

export const EVM_SUPPORTED_CHAINS: BaseChain[] = IS_TEST
  ? [
      { chain_id: chainIDs.ethTest, chain_name: "Ethereum Testnet" },
      { chain_id: chainIDs.binanceTest, chain_name: "BNB Smart Chain Testnet" },
      { chain_id: chainIDs.polygonTest, chain_name: "Polygon Testnet" },
      { chain_id: chainIDs.polygonLocal, chain_name: "Polygon Local" },
    ]
  : [
      { chain_id: chainIDs.ethMain, chain_name: "Ethereum Mainnet" },
      { chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" },
      // {chain_id: chainIDs.binanceMain, chain_name: "BNB Smart Chain Mainnet"},
    ];
