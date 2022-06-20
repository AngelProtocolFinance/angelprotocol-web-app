import { ProviderId } from "./types";
import { WithBalance } from "services/types";
import binanceWalletIcon from "assets/icons/wallets/binance.png";
import keplr from "assets/icons/wallets/keplr.png";
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
  "leap-wallet": "https://leapwallet.io/icon.png",
  "falcon-wallet": "https://api.falconwallet.app/assets/images/falcon-logo.png",
  "bitkeep-wallet":
    "https://cdn.bitkeep.vip/u_b_6151d430-ae42-11ec-9c39-b7ca284b7fe4.png",
  walletconnect: walletConnectIcon,
  torus: torusIcon,
  keplr,
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
  "leap-wallet": lunaTokenWithBalance,
  "falcon-wallet": lunaTokenWithBalance,
  "bitkeep-wallet": lunaTokenWithBalance,
  keplr: lunaTokenWithBalance,
  walletconnect: lunaTokenWithBalance,
  torus: lunaTokenWithBalance,
};
