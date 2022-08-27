import { WalletId } from "./types";
import { Chain } from "types/server/aws";
import tokenLogo from "assets/icons/currencies/token.svg";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import keplr from "assets/icons/wallets/keplr.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import terraStationIcon from "assets/icons/wallets/terra-extension.jpg";
import torusIcon from "assets/icons/wallets/torus.jpg";
import walletConnectIcon from "assets/icons/wallets/wallet-connect.png";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";
import { EXPECTED_NETWORK_TYPE } from "constants/env";

export const providerIcons: { [key in WalletId]: string } = {
  "binance-wallet": binanceWalletIcon,
  metamask: metamaskIcon,
  xdefi: xdefiIcon,
  "xdefi-wallet": xdefiIcon,
  "xdefi-evm": xdefiIcon,
  station: terraStationIcon,
  walletconnect: walletConnectIcon,
  torus: torusIcon,
  keplr,
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
    },
  ],
  type: "placeholder" as any,
};
