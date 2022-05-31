import { ProviderId } from "./types";
import binanceWalletIcon from "assets/icons/wallets/binance.svg";
import metamaskIcon from "assets/icons/wallets/metamask.svg";
import terraStationIcon from "assets/icons/wallets/terra-extension.jpg";
import torusIcon from "assets/icons/wallets/torus.jpg";
import walletConnectIcon from "assets/icons/wallets/wallet-connect.jpg";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";

export const providerIcons: { [key in ProviderId]: string } = {
  "binance-wallet": binanceWalletIcon,
  metamask: metamaskIcon,
  xdefi: xdefiIcon,
  "terra-station": terraStationIcon,
  "wallet-connect": walletConnectIcon,
  torus: torusIcon,
};
