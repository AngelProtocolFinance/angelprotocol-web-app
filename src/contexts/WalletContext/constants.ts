import { ProviderId } from "./types";
import { Chain } from "types/aws";
import tokenLogo from "assets/icons/currencies/token.svg";
import evmIcon from "assets/icons/evm.webp";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import keplr from "assets/icons/wallets/keplr.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import terraStationIcon from "assets/icons/wallets/terra-extension.jpg";
import walletConnectIcon from "assets/icons/wallets/wallet-connect.png";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";
import { EXPECTED_NETWORK_TYPE } from "constants/env";

export const providerIcons: { [key in ProviderId]: string } = {
  "binance-wallet": binanceWalletIcon,
  metamask: metamaskIcon,
  "xdefi-wallet": xdefiIcon,
  "xdefi-evm": evmIcon,
  station: terraStationIcon,
  "leap-wallet": "https://leapwallet.io/icon.png",
  "falcon-wallet": "https://api.falconwallet.app/assets/images/falcon-logo.png",
  "bitkeep-wallet":
    "https://cdn.bitkeep.vip/u_b_6151d430-ae42-11ec-9c39-b7ca284b7fe4.png",
  walletconnect: walletConnectIcon,
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
  type: "placeholder",
};
