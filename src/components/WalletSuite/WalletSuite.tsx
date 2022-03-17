import { WalletSuiteContext } from "providers/WalletSuiteProvider";
import { useContext, useEffect } from "react";
import { IoWalletSharp } from "react-icons/io5";
import { Providers } from "services/wallet/types";
import { useGetter } from "store/accessors";
import ConnectOptions from "./ConnectOptions";
import Display from "./Display";
import useWalletUpdator from "./useWalletUpdator";

export default function WalletSuite() {
  const provider = useGetter((state) => state.provider);
  useWalletUpdator(provider.active);

  const { connectOptionsShown, setConnectOptionsShown } =
    useContext(WalletSuiteContext);

  const toggleConnectOptions = () => setConnectOptionsShown((p) => !p);
  const hideConnectOptions = () => setConnectOptionsShown(false);

  const isProviderActive = provider.active !== Providers.none;
  //close modal after connecting
  useEffect(() => {
    isProviderActive && setConnectOptionsShown(false);
    //eslint-disable-next-line
  }, [isProviderActive]);

  return (
    <div className="relative border border-opacity-40 hover:bg-white hover:bg-opacity-10 rounded-md">
      {!isProviderActive && (
        <button
          className="flex py-2 px-3 items-center text-white  "
          disabled={provider.isSwitching}
          onClick={toggleConnectOptions}
        >
          <IoWalletSharp className="text-white text-xl mr-2" />
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
