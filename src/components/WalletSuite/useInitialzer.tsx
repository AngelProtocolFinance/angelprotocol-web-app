import { useWallet, WalletStatus } from "@terra-dev/use-wallet";
import { useEffect, useRef } from "react";
import { Wallets, WalletStates } from "./types";
import { useSetWallet } from "./WalletSuite";

export default function useInitializer() {
  const { setActiveWallet } = useSetWallet();
  const initWalletRef = useRef<Wallets>(Wallets.none);

  const { status: terraStatus } = useWallet();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const walletStates: WalletStates = [
    [Wallets.terraStationExt, terraConnected],
    [Wallets.terraStationMobile, terraConnected],
    [Wallets.future, false],
  ];

  const isOneConnected = walletStates.some(([wallet, isConnected]) => {
    if (isConnected) {
      initWalletRef.current = wallet;
      return isConnected;
    } else {
      return false;
    }
  });

  //TODO: since this also resets activeWallet, should delete disconnect clause in
  //individual wallets ??
  useEffect(() => {
    if (isOneConnected) {
      setActiveWallet(initWalletRef.current);
    } else {
      setActiveWallet(Wallets.none);
    }
  }, [isOneConnected]);
}
