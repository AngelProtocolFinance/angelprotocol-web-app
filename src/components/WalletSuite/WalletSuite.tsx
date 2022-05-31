import { useEffect, useState } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import { chainIDs } from "constants/chainIDs";
import ConnectOptions from "./ConnectOptions";
import WalletOpener from "./ConnectedWallet/WalletOpener";
import NetworkSelectionOpener from "./NetworkSelector/NetworkSelectionOpener";

export default function WalletSuite() {
  const { providerId, isProviderLoading, displayCoin } = useGetWallet();
  const [connectOptionsShown, setConnectOptionsShown] = useState(false);
  const toggleConnectOptions = () => setConnectOptionsShown((p) => !p);
  const hideConnectOptions = () => {
    if (connectOptionsShown) {
      setConnectOptionsShown(false);
    }
  };
  //close modal after connecting
  useEffect(() => {
    providerId && setConnectOptionsShown(false);
    //eslint-disable-next-line
  }, [providerId]);

  const isNetworkSupported = displayCoin.chainId !== chainIDs.unsupported;

  return (
    <div
      className={`relative border ${
        isNetworkSupported ? "border-white/40" : "border-red-200/80"
      } hover:bg-white/10 rounded-md`}
    >
      {!providerId && (
        <button
          className="flex py-2 px-3 items-center text-white  "
          disabled={isProviderLoading}
          onClick={toggleConnectOptions}
        >
          <Icon type="Wallet" className="text-white text-xl mr-2" />
          <span>{isProviderLoading ? "Loading" : "Connect"}</span>
        </button>
      )}
      {providerId && isNetworkSupported && <WalletOpener />}
      {providerId && !isNetworkSupported && <NetworkSelectionOpener />}
      {connectOptionsShown && (
        <ConnectOptions closeHandler={hideConnectOptions} />
      )}
    </div>
  );
}
