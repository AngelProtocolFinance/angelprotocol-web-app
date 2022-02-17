import { WalletSuiteContext } from "providers/WalletSuiteProvider";
import { useContext, useEffect } from "react";

export default function ConnectOwnWallet() {
  const { connectorsShown, setShowConnectors } = useContext(WalletSuiteContext);

  useEffect(() => setShowConnectors(true), []);

  return (
    <h2 className="md:text-xl font-bold">Please connect your own wallet</h2>
  );
}
