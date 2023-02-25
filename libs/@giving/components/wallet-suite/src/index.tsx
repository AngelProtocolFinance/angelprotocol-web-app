import { useGetWallet } from "@giving/contexts/wallet-context";
import ConnectedWallet from "./ConnectedWallet";
import WalletSelectorOpener from "./WalletSelectorOpener";

export default function WalletSuite() {
  const { wallet, isLoading } = useGetWallet();
  //TODO: balance fetching and connecting must be separate
  if (isLoading || !wallet) {
    return <WalletSelectorOpener isLoading={isLoading} />;
  }

  return <ConnectedWallet {...wallet} />;
}
