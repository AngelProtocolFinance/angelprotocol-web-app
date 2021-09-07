import {
  useWallet,
  ConnectType,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { useHeaderColors } from "contexts/HeaderColorProvider";

export default function Connector() {
  const { textColor } = useHeaderColors();
  const { availableConnectTypes, connect, disconnect, status } = useWallet();

  const isConnectible = availableConnectTypes.includes(
    ConnectType.CHROME_EXTENSION
  );
  const isConnected = status === WalletStatus.WALLET_CONNECTED;
  const bgColor = isConnected ? "red-400" : "angel-orange";

  function handleClick() {
    if (isConnected) {
      disconnect();
    } else {
      connect(ConnectType.CHROME_EXTENSION);
    }
  }

  if (isConnectible) {
    return (
      <button
        onClick={handleClick}
        className={`bg-${bgColor} py-1 px-2 rounded-sm shadow-sm uppercase text-sm font-semibold ${textColor}`}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    );
  } else {
    return null;
  }
}
