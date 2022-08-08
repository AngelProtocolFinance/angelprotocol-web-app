import { useGetWallet } from "contexts/WalletContext/WalletContext";
import ConnectedWallet from "./ConnectedWallet";
import WalletSelector from "./WalletSelector";

export default function WalletSuite() {
  const { wallet, isProviderLoading } = useGetWallet();

  if (isProviderLoading || !wallet) {
    return <WalletSelector isLoading={isProviderLoading} />;
  }

  return <ConnectedWallet {...wallet} />;
}
