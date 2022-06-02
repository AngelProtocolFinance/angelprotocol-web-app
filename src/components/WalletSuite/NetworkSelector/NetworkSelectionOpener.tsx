import { useState } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import isTerraProvider from "contexts/WalletContext/helpers/isTerraProvider";
import Icon from "components/Icon";
import NetworkSelection from "./NetworkSelection";

//this component won't be rendered if wallet is not connected
export default function NetworkSelectionOpener() {
  const { isWalletLoading } = useGetWallet();
  const [optionsShown, setIsOptionsShown] = useState(false);
  const toggleDetails = () => setIsOptionsShown((p) => !p);
  const hideDetails = () => optionsShown && setIsOptionsShown(false);

  return (
    <>
      <button
        disabled={isWalletLoading}
        onClick={toggleDetails}
        className="flex items-center py-2 px-3"
      >
        <Icon type="Wallet" className="text-rose-300 text-xl mr-2" />
        <p className="text-xs font-heading font-bold flex items-center text-rose-300">
          {isWalletLoading ? "Switching.." : "Unsupported network"}
        </p>
      </button>
      {optionsShown && !isWalletLoading && (
        <NetworkSelection closeHandler={hideDetails} />
      )}
    </>
  );
}
