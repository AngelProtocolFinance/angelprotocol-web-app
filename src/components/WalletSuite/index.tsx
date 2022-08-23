import { useWalletContext } from "contexts/Wallet";
import ConnectedWallet from "./ConnectedWallet";
import WalletSelector from "./WalletSelector";

export default function WalletSuite() {
  const { info, isLoading, connections } = useWalletContext();
  //TODO: balance fetching and connecting must be separate
  if (isLoading || !info) {
    return <WalletSelector isLoading={isLoading} connections={connections} />;
  }

  return <ConnectedWallet {...info} />;
}
