import {
  useWallet,
  ConnectType,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { useHeaderColors } from "contexts/HeaderColorProvider";
import { IoMdWallet } from "react-icons/io";

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
        className={`bg-${bgColor} py-1 px-2 rounded-sm shadow-sm uppercase text-sm font-semibold ${textColor} flex items-center`}
      >
        <IoMdWallet className="text-lg mr-1" />{" "}
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    );
  } else {
    return null;
  }
}
