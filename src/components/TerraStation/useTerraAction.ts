import {
  ConnectType,
  useWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
export default function useTerraAction(type: ConnectType) {
  const {
    availableConnectTypes,
    connect,
    availableInstallTypes,
    install,
    status,
  } = useWallet();
  const isConnectible = availableConnectTypes.includes(type);
  const isInstallable = availableInstallTypes.includes(type);
  const shouldConnect =
    isConnectible && status !== WalletStatus.WALLET_CONNECTED && !isInstallable;

  function handleClick() {
    if (shouldConnect) {
      connect(type);
    } else if (isInstallable) {
      install(type);
    } else {
      return;
    }
  }
  return { handleClick, isInstallable };
}
