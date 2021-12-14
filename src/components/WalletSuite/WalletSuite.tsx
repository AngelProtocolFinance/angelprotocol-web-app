import { IoWalletSharp } from "react-icons/io5";
import TerraDisplay from "components/TerraStation/Display";
import EthDisplay from "components/Ethereum/Display";
import PhantomDisp from "components/Phantom/Display";
import KeplrDisp from "components/Keplr/Display";
import { useEffect, useState } from "react";
import Connectors from "./Connectors";
import { useGetter } from "store/accessors";
import { Wallets } from "services/wallet/types";

export default function WalletSuite() {
  const [connectorsShown, showConnectors] = useState(false);
  const { activeWallet, isLoading } = useGetter((state) => state.wallet);
  const isConnected = activeWallet !== Wallets.none;
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
          disabled={isLoading}
          onClick={toggleConnector}
        >
          {activeWallet === Wallets.none && (
            <IoWalletSharp className="text-white text-xl mr-2" />
          )}
          <span>{isLoading ? "Loading" : "Connect"}</span>
        </button>
      )}
      {displays[activeWallet]}
      {connectorsShown && <Connectors closeHandler={hideConnectors} />}
    </div>
  );
}

const displays = {
  [Wallets.none]: null,
  [Wallets.ethereum]: <EthDisplay />,
  [Wallets.terra]: <TerraDisplay />,
  [Wallets.phantom]: <PhantomDisp />,
  [Wallets.keplr]: <KeplrDisp />,
};
