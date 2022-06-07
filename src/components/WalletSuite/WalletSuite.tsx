import { useEffect, useState } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import ConnectOptions from "./ConnectOptions";
import WalletOpener from "./ConnectedWallet/WalletOpener";

export default function WalletSuite() {
  const { providerId, isProviderLoading } = useGetWallet();
  const [connectOptionsShown, setConnectOptionsShown] = useState(false);
  const toggleConnectOptions = () => setConnectOptionsShown((p) => !p);
  const hideConnectOptions = () => {
    if (connectOptionsShown) {
      setConnectOptionsShown(false);
    }
  };

  const isProviderConnected = providerId !== "unknown";
  //close modal after connecting
  useEffect(() => {
    isProviderConnected && setConnectOptionsShown(false);
    //eslint-disable-next-line
  }, [isProviderConnected]);

  return (
    <div
      className={`relative border border-white/40 hover:bg-white/10 rounded-md`}
    >
      {!isProviderConnected && (
        <button
          className="flex py-2 px-3 items-center text-white  "
          disabled={isProviderLoading}
          onClick={toggleConnectOptions}
        >
          <Icon type="Wallet" className="text-white text-xl mr-2" />
          <span>{isProviderLoading ? "Loading" : "Connect"}</span>
        </button>
      )}
      {isProviderConnected && <WalletOpener />}
      {connectOptionsShown && (
        <ConnectOptions closeHandler={hideConnectOptions} />
      )}
    </div>
  );
}
