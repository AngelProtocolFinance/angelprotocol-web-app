import Wallet from "components/Wallet/Wallet";
import { useHeaderColors } from "contexts/HeaderColorProvider";
import useTerraConnector from "./useTerraConnector";

export default function TerraConnector() {
  const { textColor } = useHeaderColors();
  const {
    status,
    WalletStatus,
    isInstallable,
    isConnectible,
    handleConnect,
    handleInstall,
  } = useTerraConnector();

  switch (status) {
    case WalletStatus.INITIALIZING:
      return (
        <div>
          <button className={`text-${textColor}`} disabled>
            Initializing Wallet...
          </button>
        </div>
      );
    case WalletStatus.WALLET_NOT_CONNECTED:
      return (
        <div>
          {isConnectible && (
            <button
              className="uppercase bg-orange rounded-xl w-40 h-8 d-flex justify-center items-center text-sm"
              onClick={handleConnect}
            >
              Connect Wallet
            </button>
          )}
          {isInstallable && (
            <button
              className="uppercase bg-leaf-green rounded-xl w-40 h-8 d-flex justify-center items-center text-sm"
              onClick={handleInstall}
            >
              Install Wallet
            </button>
          )}
        </div>
      );
    case WalletStatus.WALLET_CONNECTED:
      return <Wallet />;
  }
}
