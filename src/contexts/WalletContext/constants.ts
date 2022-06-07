import binanceWalletIcon from "assets/icons/wallets/binance.svg";
import metamaskIcon from "assets/icons/wallets/metamask.svg";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";
import { ProviderId } from "./types";

export const providerIcons: { [key in ProviderId]: string } = {
  "binance-wallet": binanceWalletIcon,
  metamask: metamaskIcon,
  xdefi: xdefiIcon,
};
