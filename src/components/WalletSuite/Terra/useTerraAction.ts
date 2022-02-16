import {
  Connection,
  useWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { setIcon } from "components/WalletSuite/manageIcon";
import { useGetter } from "store/accessors";

export default function useTerraAction(options: Connection) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { connect, status } = useWallet();

  const shouldConnect = status === WalletStatus.WALLET_NOT_CONNECTED;
  function handleClick() {
    if (shouldConnect) {
      connect(options.type, options.identifier);
      setIcon(options.icon);
    } else {
      return;
    }
  }
  return {
    handleClick,
    isUpdating,
  };
}
