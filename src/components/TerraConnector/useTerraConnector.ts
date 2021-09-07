import {
  useWallet,
  WalletStatus,
  ConnectType,
} from "@terra-money/wallet-provider";

export default function useTerraConnector() {
  const {
    status,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    disconnect,
    install,
    wallets,
  } = useWallet();

  console.log(availableConnectTypes, availableInstallTypes);

  const isInstallable = availableInstallTypes.includes(
    ConnectType.CHROME_EXTENSION
  );

  const isConnectible = availableConnectTypes.includes(
    ConnectType.CHROME_EXTENSION
  );

  function handleConnect() {
    connect(ConnectType.CHROME_EXTENSION);
  }

  function handleInstall() {
    install(ConnectType.CHROME_EXTENSION);
  }

  function handleDisconnect(e: React.MouseEvent) {
    e.preventDefault();
    disconnect();
  }

  return {
    status,
    wallets,
    WalletStatus,
    isInstallable,
    isConnectible,
    handleConnect,
    handleInstall,
    handleDisconnect,
  };
}
