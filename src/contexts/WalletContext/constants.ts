import { ProviderId } from "./types";
import { WithBalance } from "services/types";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import terraStationIcon from "assets/icons/wallets/terra-extension.jpg";
import torusIcon from "assets/icons/wallets/torus.jpg";
import walletConnectIcon from "assets/icons/wallets/wallet-connect.png";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";
import { ethereumToken, lunaToken } from "services/apes/tokens/constants";

export const providerIcons: { [key in ProviderId]: string } = {
  "binance-wallet": binanceWalletIcon,
  metamask: metamaskIcon,
  "xdefi-wallet": xdefiIcon,
  "xdefi-evm": xdefiIcon,
  station: terraStationIcon,
  walletconnect: walletConnectIcon,
  torus: torusIcon,
  unknown: "",
};

const ethTokenWithBalance = { ...ethereumToken, balance: 0 };
const lunaTokenWithBalance = { ...lunaToken, balance: 0 };
export const placeHolderDisplayToken: {
  [key in ProviderId]: WithBalance;
} = {
  "binance-wallet": ethTokenWithBalance,
  metamask: ethTokenWithBalance,
  "xdefi-wallet": lunaTokenWithBalance,
  "xdefi-evm": ethTokenWithBalance,
  station: lunaTokenWithBalance,
  walletconnect: lunaTokenWithBalance,
  torus: lunaTokenWithBalance,
  unknown: ethTokenWithBalance,
};
