import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { useEffect } from "react";
import { Wallets, WalletStates } from "./types";
import { useSetWallet } from "./WalletSuite";

export default function useActivator() {
  const setActiveWallet = useSetWallet();

  const { status: terraStatus } = useWallet();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const isTerraLoading = terraStatus === WalletStatus.INITIALIZING;

  const isLoading = isTerraLoading; // || false || otherwallet loading state
  const walletStates: WalletStates = [
    [Wallets.terraStationExt, terraConnected],
    [Wallets.terraStationMobile, terraConnected],
    [Wallets.future, false],
  ];

  //find first connected wallet
  //undefined if not wallet is connected
  const activeWallet = walletStates.find((walletState) => walletState[1]);

  useEffect(() => {
    if (activeWallet) {
      const [wallet] = activeWallet;
      setActiveWallet(wallet);
    } else {
      setActiveWallet(Wallets.none);
    }
    //eslint-disable-next-line
  }, [activeWallet]);

  return isLoading;
}
