import { useEffect, useState } from "react";
import { Providers } from "services/wallet/types";
import Icon from "components/Icons/Icons";
import { useGetter } from "store/accessors";
import ConnectOptions from "./ConnectOptions";
import Display from "./Display";
import useWalletUpdator from "./useWalletUpdator";

export default function WalletSuite() {
  const provider = useGetter((state) => state.provider);

  useWalletUpdator(provider.active);

  const [connectOptionsShown, setConnectOptionsShown] = useState(false);
  const toggleConnectOptions = () => setConnectOptionsShown((p) => !p);
  const hideConnectOptions = () => {
    if (connectOptionsShown) {
      setConnectOptionsShown(false);
    }
  };

  const isProviderActive = provider.active !== Providers.none;

  //close modal after connecting
  useEffect(() => {
    isProviderActive && setConnectOptionsShown(false);
    //eslint-disable-next-line
  }, [isProviderActive]);

  return (
    <div className="relative border border-white/40 hover:bg-white/10 rounded-md">
      {!isProviderActive && (
        <button
          className="flex py-2 px-3 items-center text-white  "
          disabled={provider.isSwitching}
          onClick={toggleConnectOptions}
        >
          <Icon type="Wallet" className="text-white text-xl mr-2" />
          <span>{provider.isSwitching ? "Loading" : "Connect"}</span>
        </button>
      )}
      {isProviderActive && <Display />}
      {connectOptionsShown && (
        <ConnectOptions closeHandler={hideConnectOptions} />
      )}
    </div>
  );
}
