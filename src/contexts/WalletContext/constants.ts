import binanceWalletIcon from "assets/icons/wallets/binance.svg";
import metamaskIcon from "assets/icons/wallets/metamask.svg";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";
import { ethereumToken } from "services/apes/tokens/constants";
import { WithBalance } from "services/types";
import { ProviderId } from "./types";

export const providerIcons: { [key in ProviderId]: string } = {
  "binance-wallet": binanceWalletIcon,
  metamask: metamaskIcon,
  xdefi: xdefiIcon,
  unknown: "",
};

const ethTokenWithBalance = { ...ethereumToken, balance: 0 };
export const placeHolderDisplayToken: {
  [key in ProviderId]: WithBalance;
} = {
  "binance-wallet": ethTokenWithBalance,
  metamask: ethTokenWithBalance,
  xdefi: ethTokenWithBalance,
  unknown: ethTokenWithBalance,
};
