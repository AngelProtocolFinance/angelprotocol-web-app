import tokenLogo from "@giving/assets/icons/currencies/token.svg";
import binanceWalletIcon from "@giving/assets/icons/wallets/binance.png";
import keplrIcon from "@giving/assets/icons/wallets/keplr.png";
import metamaskIcon from "@giving/assets/icons/wallets/metamask.png";
import xdefiIcon from "@giving/assets/icons/wallets/xdefi.jpg";
import { chainIDs } from "@giving/constants/chains";
import { EXPECTED_NETWORK_TYPE, IS_TEST } from "@giving/constants/env";
import { WithoutInstallers } from "./types";
import { BaseChain, Chain } from "@giving/types/aws";

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
    type: "placeholder",
    symbol: "NATIVE",
    logo: tokenLogo,
    decimals: 18,
    balance: 0,
    approved: true,
    name: "Native",
    token_id: "unative",
    min_donation_amnt: 0.01,
  },
  network_type: EXPECTED_NETWORK_TYPE,
  rpc_url: "https://rpc-token.placeholder.com",
  lcd_url: "https://lcd-token.placeholder.com",
  tokens: [
    {
      type: "placeholder",
      symbol: "TOKEN",
      logo: tokenLogo,
      decimals: 18,
      balance: 0,
      approved: true,
      name: "Token",
      token_id: "utoken",
      min_donation_amnt: 0.01,
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
    ]
  : [
      { chain_id: chainIDs.ethMain, chain_name: "Ethereum Mainnet" },
      { chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" },
      // {chain_id: chainIDs.binanceMain, chain_name: "BNB Smart Chain Mainnet"},
    ];
