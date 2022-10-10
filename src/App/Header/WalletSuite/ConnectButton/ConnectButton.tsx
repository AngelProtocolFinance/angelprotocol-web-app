import { useGetWallet } from "contexts/WalletContext/WalletContext";
import ConnectedWallet from "./ConnectedWallet";
import WalletSelector from "./WalletSelector";

export default function ConnectButton() {
  const { wallet, isLoading } = useGetWallet();
  //TODO: balance fetching and connecting must be separate
  if (isLoading || !wallet) {
    return <WalletSelector isLoading={isLoading} />;
  }

  return <ConnectedWallet {...wallet} />;
}
