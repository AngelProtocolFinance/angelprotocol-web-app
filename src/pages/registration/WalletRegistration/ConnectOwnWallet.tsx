import { WalletSuiteContext } from "providers/WalletSuiteProvider";
import { useContext, useEffect } from "react";

export default function ConnectOwnWallet() {
  const { setShowConnectors } = useContext(WalletSuiteContext);

  useEffect(() => setShowConnectors(true), [setShowConnectors]);

  return (
    <h2 className="md:text-xl font-bold">Please connect your own wallet</h2>
  );
}
