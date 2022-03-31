import { useEffect, useMemo, useState } from "react";
import { IWalletContext, WalletProxy } from "../types";
import useTerraJsWallet from "./useTerraJsWallet";
import useTorusWallet from "./useTorusWallet";

export default function useWalletProxy(): IWalletContext {
  const [wallet, setWallet] = useState<WalletProxy>();

  const {
    availableInstallations,
    availableWallets: availableTerraJsWallets,
    status: statusTerraJs,
    wallet: walletTerraJs,
  } = useTerraJsWallet();
  const { status: statusTorus, wallet: walletTorus } = useTorusWallet();

  useEffect(() => {
    if (walletTerraJs) {
      setWallet(walletTerraJs);
    } else if (walletTorus) {
      setWallet(walletTorus);
    } else {
      setWallet(undefined);
    }
  }, [walletTerraJs, walletTorus]);

  const availableWallets = useMemo(
    () => availableTerraJsWallets.concat(walletTorus),
    [availableTerraJsWallets, walletTorus]
  );

  const walletContext: IWalletContext = useMemo(
    () => ({
      wallet,
      availableInstallations,
      availableWallets,
      status: wallet?.connection.type === "TORUS" ? statusTorus : statusTerraJs,
    }),
    [
      availableWallets,
      availableInstallations,
      statusTerraJs,
      statusTorus,
      wallet,
    ]
  );

  return walletContext;
}
