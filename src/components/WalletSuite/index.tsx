import { useWalletContext } from "contexts/WalletContext";
import ConnectedWallet from "./ConnectedWallet";
import WalletSelector from "./WalletSelector";

export default function WalletSuite() {
  const { wallet, isLoading, connections } = useWalletContext();
  //TODO: balance fetching and connecting must be separate
  if (isLoading || !wallet) {
    return <WalletSelector isLoading={isLoading} connections={connections} />;
  }
  return <ConnectedWallet {...wallet} />;
}
