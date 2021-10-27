import { setIcon } from "components/WalletSuite/manageIcon";
import { Connectors, Icons } from "components/WalletSuite/types";
import { useGetState } from "components/WalletSuite/WalletSuite";
import { useWallet } from "use-wallet";

export default function useAction(type: Connectors, icon: Icons) {
  const wallet = useWallet();
  const { isLoading } = useGetState();

  async function handleConnect() {
    try {
      await wallet.connect(type);
      setIcon(icon);
    } catch (err) {
      console.error(err);
    }
  }

  return { handleConnect, isLoading };
}
