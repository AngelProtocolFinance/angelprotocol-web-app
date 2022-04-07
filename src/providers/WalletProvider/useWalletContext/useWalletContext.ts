import { useMemo } from "react";
import { IWalletContext } from "../types";
import useTerraJsWallet from "./useTerraJsWallet";
import useTorusWallet from "./useTorusWallet";

export default function useWalletContext(): IWalletContext {
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

  const walletContext: IWalletContext = useMemo(() => {
    // These if-checks are safe for setting connected wallets, because
    // at any point only one will be connected.
    const wallet = walletTerraJs || walletTorus;
    return {
      wallet,
      availableInstallations,
      availableWallets: availableWallets.concat(availableTorusWallets),
      status: wallet?.connection.type === "TORUS" ? statusTorus : statusTerraJs,
    };
  }, [
    walletTerraJs,
    walletTorus,
    statusTorus,
    statusTerraJs,
    availableWallets,
    availableTorusWallets,
    availableInstallations,
  ]);

  return walletContext;
}
