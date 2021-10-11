import { useGetWallet } from "./WalletSuite";
import { Icons, Wallets } from "./types";
import { IoWalletSharp } from "react-icons/io5";
import terraXIcon from "assets/icons/wallets/terra-extension.jpg";
import useActivator from "./useActivator";
import TerraDisplay from "components/TerraStation/Display";
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
    <div className="relative border border-opacity-30 text-white-grey rounded-md flex items-center gap-2 px-2 py-2">
      {icons[activeWallet]}
      {!isConnected && (
        <button
          className="uppercase text-sm"
          disabled={isLoading}
          onClick={toggleConnector}
        >
          {isLoading ? "Initializing" : "Connect"}
        </button>
      )}
      {displays[activeWallet]}
      {connectorsShown && <Connectors closeHandler={hideConnectors} />}
    </div>
  );
}

const TerraXIcon = () => (
  <img className="w-6 h-6 bg-white p-1 rounded-full" src={terraXIcon} alt="" />
);

const icons: Icons = {
  [Wallets.none]: <IoWalletSharp className="text-white text-xl" />,
  [Wallets.terraStationExt]: <TerraXIcon />,
  [Wallets.terraStationMobile]: <TerraXIcon />,
};

const displays = {
  [Wallets.none]: null,
  [Wallets.terraStationExt]: <TerraDisplay />,
  [Wallets.terraStationMobile]: <TerraDisplay />,
};
