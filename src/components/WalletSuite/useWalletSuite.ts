import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { useWallet as useEthWallet } from "use-wallet";
import { useEffect, useState } from "react";
import { Wallets, WalletStates } from "./types";

export default function useWalletSuite() {
  const [activeWallet, setActiveWallet] = useState<Wallets>(Wallets.none);

  const { status: ethStatus } = useEthWallet();
  const ethConnected = ethStatus === "connected";
  const ethLoading = ethStatus === "connecting";

  const { status: terraStatus } = useWallet();
  const terraConnected = terraStatus === WalletStatus.WALLET_CONNECTED;
  const isTerraLoading = terraStatus === WalletStatus.INITIALIZING;

  const isLoading = isTerraLoading || ethLoading; // || false || otherwallet loading state
  const walletStates: WalletStates = [
    [Wallets.terra, terraConnected],
    [Wallets.ethereum, ethConnected],
  ];

  //find first connected wallet
  //undefined if not wallet is connected
  const connectedWallet = walletStates.find((walletState) => walletState[1]);

  useEffect(() => {
    if (connectedWallet) {
      const [wallet] = connectedWallet;
      setActiveWallet(wallet);
    } else {
      setActiveWallet(Wallets.none);
    }
    return () => setActiveWallet(Wallets.none);
    //eslint-disable-next-line
  }, [connectedWallet]);

  return { isLoading, activeWallet };
}
