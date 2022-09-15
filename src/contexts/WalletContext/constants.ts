import { ProviderId } from "./types";
import { Chain } from "types/aws";
import tokenLogo from "assets/icons/currencies/token.svg";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import keplrIcon from "assets/icons/wallets/keplr.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import terraStationIcon from "assets/icons/wallets/terra-extension.jpg";
import walletConnectIcon from "assets/icons/wallets/wallet-connect.png";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";
import { EXPECTED_NETWORK_TYPE } from "constants/env";

export const WALLET_METADATA: {
  [key in ProviderId]: { logo: string; installUrl: string; name: string };
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
  "xdefi-wallet": {
    logo: binanceWalletIcon,
    installUrl: "https://www.xdefi.io/",
    name: "XDEFI",
  },
  "xdefi-evm": {
    logo: xdefiIcon,
    installUrl: "https://www.xdefi.io/",
    name: "XDEFI",
  },
  station: {
    logo: terraStationIcon,
    installUrl:
      "https://chrome.google.com/webstore/detail/terra-station-wallet/aiifbnbfobpmeekipheeijimdpnlpgpp",
    name: "Terra Station",
  },
  "leap-wallet": {
    logo: "https://leapwallet.io/icon.png",
    installUrl: "https://www.leapwallet.io/",
    name: "Leap Wallet",
  },
  "falcon-wallet": {
    logo: "https://api.falconwallet.app/assets/images/falcon-logo.png",
    installUrl: "https://www.falconwallet.app/",
    name: "Falcon Wallet",
  },
  "bitkeep-wallet": {
    logo: "https://cdn.bitkeep.vip/u_b_6151d430-ae42-11ec-9c39-b7ca284b7fe4.png",
    installUrl: "https://bitkeep.com/",
    name: "Bitkeep Wallet",
  },
  walletconnect: {
    logo: walletConnectIcon,
    installUrl: "",
    name: "Wallet Connect",
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
