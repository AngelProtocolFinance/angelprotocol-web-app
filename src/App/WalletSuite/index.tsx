import { useGetWallet } from "contexts/WalletContext";
import ConnectedWallet from "./ConnectedWallet";
import WalletSelectorOpener from "./WalletSelectorOpener";

type Props = { menuPlacement?: "top" | "bottom"; classes?: string };

export default function WalletSuite(props: Props) {
  const { wallet, isLoading } = useGetWallet();
  //TODO: balance fetching and connecting must be separate
  if (isLoading || !wallet) {
    return <WalletSelectorOpener isLoading={isLoading} {...props} />;
  }

  return <ConnectedWallet {...wallet} />;
}
