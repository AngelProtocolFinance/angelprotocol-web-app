import { useGetWallet } from "./WalletSuite";
import { Icons, Wallets } from "./types";
import { IoWalletSharp } from "react-icons/io5";
import useActivator from "./useActivator";
import TerraDisplay from "components/TerraStation/Display";
import MetaMaskDisplay from "components/Metamask/Display";
import { useEffect, useState } from "react";
import Connectors from "./Connectors";

export default function Toolkit() {
  const [connectorsShown, showConnectors] = useState(false);
  const activeWallet = useGetWallet();
  const isLoading = useActivator();
  const isConnected = activeWallet !== Wallets.none;

  //close modal after connecting
  useEffect(() => {
    isConnected && showConnectors(false);
    //eslint-disable-next-line
  }, [isConnected]);

  const toggleConnector = () => showConnectors((p) => !p);
  const hideConnectors = () => showConnectors(false);

  return (
    <div className="relative border border-opacity-40 hover:bg-white hover:bg-opacity-10 rounded-md">
      {!isConnected && (
        <button
          className="flex py-2 px-3 items-center text-white  "
          disabled={isLoading}
          onClick={toggleConnector}
        >
          {activeWallet === Wallets.none && (
            <IoWalletSharp className="text-white text-xl mr-2" />
          )}
          <span>{isLoading ? "Initializing" : "Connect"}</span>
        </button>
      )}
      {displays[activeWallet]}
      {connectorsShown && <Connectors closeHandler={hideConnectors} />}
    </div>
  );
}

const displays = {
  [Wallets.none]: null,
  [Wallets.ethereum]: <MetaMaskDisplay />,
  [Wallets.terra]: <TerraDisplay />,
};
