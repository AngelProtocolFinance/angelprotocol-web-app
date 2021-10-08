import {
  useWallet,
  ConnectType,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { Wallets } from "components/WalletSuite/types";
import { useGetWallet, useSetWallet } from "components/WalletSuite/WalletSuite";
import useActivator from "./useActivator";

type Props = {
  type: ConnectType;
};

export default function Connector(props: Props) {
  console.log("renders");
  const { availableConnectTypes, connect, disconnect, status } = useWallet();
  const { activeWallet } = useGetWallet();
  const { setCurrWallet } = useSetWallet();

  const isConnectible = availableConnectTypes.includes(props.type);
  const isConnected = status === WalletStatus.WALLET_CONNECTED;

  const thisWallet =
    props.type === ConnectType.CHROME_EXTENSION
      ? Wallets.terraStationExt
      : Wallets.terraStationMobile;

  // useActivator(status, thisWallet);

  function handleClick() {
    if (isConnected) {
      disconnect();
    } else {
      //set wallet to be activated before next render
      // setCurrWallet(thisWallet);
      //connect and renders component
      connect(props.type);
    }
  }

  if (
    //show controls only if wallet is active or there's not active wallet yet
    (isConnectible && activeWallet === thisWallet) ||
    activeWallet === Wallets.none
  ) {
    return (
      <button
        onClick={handleClick}
        className={`mt-2 uppercase text-xs bg-white bg-opacity-50 text-white px-3 py-1 rounded-sm`}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    );
  } else {
    return null;
  }
}
