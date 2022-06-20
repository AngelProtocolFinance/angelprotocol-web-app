import { WalletState } from "contexts/WalletContext/WalletContext";
import { placeHolderDisplayToken } from "contexts/WalletContext/constants";
import { chainIDs } from "constants/chainIDs";

export const WALLET: WalletState = {
  walletIcon: "",
  displayCoin: placeHolderDisplayToken["station"],
  coins: [placeHolderDisplayToken["station"]],
  address: "terra1w0fn5u7puxafp3g2mehe6xvt4w2x2eennm7tzf",
  chainId: chainIDs.terra_test,
  providerId: "station",
};
