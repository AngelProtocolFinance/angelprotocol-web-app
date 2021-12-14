import {
  ConnectType,
  useWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { setIcon } from "components/WalletSuite/manageIcon";
import { Icons } from "components/WalletSuite/types";
import { useGetter } from "store/accessors";

export default function useTerraAction(type: ConnectType) {
  const { isLoading } = useGetter((state) => state.wallet);
  const {
    availableConnectTypes,
    connect,
    availableInstallTypes,
    install,
    status,
  } = useWallet();
  const icon =
    type === ConnectType.WALLETCONNECT ? Icons.terra_mobile : Icons.terra_ext;
  const isConnectible = availableConnectTypes.includes(type);
  const isInstallable = availableInstallTypes.includes(type);
  const shouldConnect =
    isConnectible && status !== WalletStatus.WALLET_CONNECTED && !isInstallable;

  function handleClick() {
    if (shouldConnect) {
      //edge case: user connects to WC with ethereum, disconnects then connects with
      //terra wallet connect, unresponsive on first click but doesn't output error
      connect(type);
      setIcon(icon);
    } else if (isInstallable) {
      install(type);
    } else {
      return;
    }
  }
  return {
    handleClick,
    isAvailable: isInstallable || isConnectible,
    isLoading,
  };
}
