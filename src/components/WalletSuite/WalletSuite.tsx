import { IoWalletSharp } from "react-icons/io5";
import TerraDisplay from "components/TerraStation/Display";
import { useEffect, useState } from "react";
import Connectors from "./Connectors";
import { useGetter } from "store/accessors";
import { Providers } from "services/wallet/types";
import useTerraUpdator from "./useTerraUpdator";

export default function WalletSuite() {
  useTerraUpdator();
  const [connectorsShown, showConnectors] = useState(false);
  const { provider, isSwitching } = useGetter((state) => state.wallet);
  const isConnected = provider !== Providers.none;
  const toggleConnector = () => showConnectors((p) => !p);
  const hideConnectors = () => showConnectors(false);

  //close modal after connecting
  useEffect(() => {
    isConnected && showConnectors(false);
    //eslint-disable-next-line
  }, [isConnected]);

  return (
    <div className="relative border border-opacity-40 hover:bg-white hover:bg-opacity-10 rounded-md">
      {!isConnected && (
        <button
          className="flex py-2 px-3 items-center text-white  "
          disabled={isSwitching}
          onClick={toggleConnector}
        >
          {provider === Providers.none && (
            <IoWalletSharp className="text-white text-xl mr-2" />
          )}
          <span>{isSwitching ? "Loading" : "Connect"}</span>
        </button>
      )}
      {displays[provider]}
      {connectorsShown && <Connectors closeHandler={hideConnectors} />}
    </div>
  );
}

const displays = {
  [Providers.none]: null,
  [Providers.terra]: <TerraDisplay />,
};
