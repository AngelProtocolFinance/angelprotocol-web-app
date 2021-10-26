import { setIcon } from "components/WalletSuite/manageIcon";
import { Icons } from "components/WalletSuite/types";
import { useWallet } from "use-wallet";

export default function useAction() {
  const wallet = useWallet();

  async function handleConnect() {
    await wallet.connect("injected");
    setIcon(Icons.metamask);
  }

  return { handleConnect, connecting: wallet.status === "connecting" };
}
