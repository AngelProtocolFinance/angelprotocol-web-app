import { WithoutInstallers } from "./types";
import { Chain } from "types/aws";
import tokenLogo from "assets/icons/currencies/token.svg";
import evmIcon from "assets/icons/evm.webp";
// import binanceWalletIcon from "assets/icons/wallets/binance.png";
import keplrIcon from "assets/icons/wallets/keplr.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";
import { EXPECTED_NETWORK_TYPE } from "constants/env";

export const WALLET_METADATA: {
  [key in WithoutInstallers]: {
    logo: string;
    installUrl: string;
    name: string;
  };
} = {
  // "binance-wallet": {
  //   logo: binanceWalletIcon,
  //   installUrl: "https://www.bnbchain.org/en/binance-wallet",
  //   name: "Binance Wallet",
  // },
  metamask: {
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
    logo: evmIcon,
    installUrl: "https://www.xdefi.io/",
    name: "XDEFI",
  },
  keplr: {
    logo: keplrIcon,
    installUrl: "https://www.keplr.app/",
    name: "Keplr",
  },
};

export const placeholderChain: Chain = {
  block_explorer_url: "https://www.placeholder.io/token/txs/",
  chain_id: "placeholder",
  chain_name: "Token",
  native_currency: {
    type: "placeholder",
    symbol: "NATIVE",
    logo: tokenLogo,
    decimals: 18,
    balance: 0,
    approved: true,
    name: "Native",
    token_id: "unative",
    min_donation_amnt: 0,
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
      min_donation_amnt: 0,
    },
  ],
  type: "placeholder",
};
