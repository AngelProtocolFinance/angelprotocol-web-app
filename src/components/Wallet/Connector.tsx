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
        className={`text-${textColor} hover:text-opacity-75 flex py-1 px-2 rounded-sm uppercase text-sm font-semibold border-2 border-${textColor} hover:border-opacity-75`}
      >
        <IoMdWallet className="text-lg mr-1" />{" "}
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    );
  } else {
    return null;
  }
}
