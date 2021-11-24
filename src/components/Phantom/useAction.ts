import { setIcon } from "components/WalletSuite/manageIcon";
import { Icons } from "components/WalletSuite/types";
import Warning, { Props } from "components/WalletSuite/Warning";
import { useSetModal } from "components/Nodal/Nodal";
import { useGetter } from "store/accessors";
import { useSetPhantom } from "wallets/Phantom";
import { RejectPhantomLogin } from "wallets/usePhantom";

export default function useAction(icon: Icons) {
  const { connect } = useSetPhantom();
  const { isLoading } = useGetter((state) => state.wallet);
  const { showModal } = useSetModal();

  async function handleConnect() {
    try {
      await connect();
      setIcon(icon);
    } catch (err) {
      console.error(err);
      if (err instanceof RejectPhantomLogin) {
        showModal<Props>(Warning, {
          text: err.message,
        });
      } else {
        showModal<Props>(Warning, {
          text: "Error connecting to phantom wallet",
        });
      }
    }
  }

  return { handleConnect, isLoading };
}
