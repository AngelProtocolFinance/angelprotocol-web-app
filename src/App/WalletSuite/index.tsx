import { useGetWallet } from "contexts/WalletContext";
import ConnectedWallet from "./ConnectedWallet";
import WalletSelector from "./WalletSelector";

type Props = { menuPlacement?: "top" | "bottom"; classes?: string };

export default function WalletSuite(props: Props) {
  const { wallet, isLoading } = useGetWallet();
  //TODO: balance fetching and connecting must be separate
  if (isLoading || !wallet) {
    return <WalletSelector isLoading={isLoading} {...props} />;
  }

  return <ConnectedWallet {...wallet} />;
}
