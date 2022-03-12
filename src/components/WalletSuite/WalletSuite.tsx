import { IoWalletSharp } from "react-icons/io5";
import Display from "./Display";
import { useEffect, useState } from "react";
import Connectors from "./Connectors";
import { useGetter } from "store/accessors";
import { Providers } from "services/wallet/types";
import useWalletUpdator from "./useWalletUpdator";

export default function WalletSuite() {
  const provider = useGetter((state) => state.provider);
  useWalletUpdator(provider.active);

  const [connectorsShown, showConnectors] = useState(false);

  const toggleConnector = () => showConnectors((p) => !p);
  const hideConnectors = () => showConnectors(false);
  const isProviderActive = provider.active !== Providers.none;
  //close modal after connecting
  useEffect(() => {
    isProviderActive && showConnectors(false);
    //eslint-disable-next-line
  }, [isProviderActive]);

  return (
    <div className="relative border border-white/40 hover:bg-white hover:bg-opacity-10 rounded-md">
      {!isProviderActive && (
        <button
          className="flex py-2 px-3 items-center text-white  "
          disabled={provider.isSwitching}
          onClick={toggleConnector}
        >
          <IoWalletSharp className="text-white text-xl mr-2" />
          <span>{provider.isSwitching ? "Loading" : "Connect"}</span>
        </button>
      )}
      {isProviderActive && <Display />}
      {connectorsShown && <Connectors closeHandler={hideConnectors} />}
    </div>
  );
}
