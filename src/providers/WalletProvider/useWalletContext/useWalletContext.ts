import { useEffect, useMemo, useState } from "react";
import { IWalletContext, WalletProxy } from "../types";
import useTerraJsWallet from "./useTerraJsWallet";
import useTorusWallet from "./useTorusWallet";

export default function useWalletContext(): IWalletContext {
  const [wallet, setWallet] = useState<WalletProxy>();

  const {
    availableInstallations,
    availableWallets,
    status: statusTerraJs,
    wallet: walletTerraJs,
  } = useTerraJsWallet();
  const {
    availableWallets: availableTorusWallets,
    status: statusTorus,
    wallet: walletTorus,
  } = useTorusWallet();

  useEffect(() => {
    // These if-checks are safe for setting connected wallets, because
    // at any point only one will be connected.
    if (walletTerraJs) {
      setWallet(walletTerraJs);
    } else if (walletTorus) {
      setWallet(walletTorus);
    } else {
      setWallet(undefined);
    }
  }, [walletTerraJs, walletTorus]);

  const walletContext: IWalletContext = useMemo(
    () => ({
      wallet,
      availableInstallations,
      availableWallets: availableWallets.concat(availableTorusWallets),
      status: wallet?.connection.type === "TORUS" ? statusTorus : statusTerraJs,
    }),
    [
      wallet,
      statusTorus,
      statusTerraJs,
      availableWallets,
      availableTorusWallets,
      availableInstallations,
    ]
  );

  return walletContext;
}
