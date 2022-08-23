import { WalletId } from "./types";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import keplr from "assets/icons/wallets/keplr.png";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import terraStationIcon from "assets/icons/wallets/terra-extension.jpg";
import torusIcon from "assets/icons/wallets/torus.jpg";
import walletConnectIcon from "assets/icons/wallets/wallet-connect.png";
import xdefiIcon from "assets/icons/wallets/xdefi.jpg";

export const providerIcons: { [key in WalletId]: string } = {
  "binance-wallet": binanceWalletIcon,
  metamask: metamaskIcon,
  "xdefi-wallet": xdefiIcon,
  "xdefi-evm": xdefiIcon,
  station: terraStationIcon,
  walletconnect: walletConnectIcon,
  torus: torusIcon,
  keplr,
};
