import { useState } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { chainIDs } from "constants/chainIDs";
import Details from "./Details";
import NetworkSelection from "./NetworkSelection";

//this component won't be rendered if wallet is not connected
export default function Display() {
  const { address, displayCoin, walletIcon, isWalletLoading } = useGetWallet();
  const [detailsShown, setIsDetailsShown] = useState(false);
  const maskedAddr = maskAddress(address);
  const toggleDetails = () => setIsDetailsShown((p) => !p);
  const hideDetails = () => detailsShown && setIsDetailsShown(false);

  const isChainSupported = displayCoin.chainId !== chainIDs.unsupported;
  return (
    <div className="flex">
      <button
        disabled={isWalletLoading}
        onClick={toggleDetails}
        className="flex items-center py-2 px-3 text-white-grey disabled:text-grey-accent"
      >
        {(!isWalletLoading && (
          <img
            src={walletIcon}
            alt=""
            className="w-6 h-6 object-contain rounded-full mr-0 sm:mr-2 bg-white p-0.5"
          />
        )) || <Icon type="Loading" className="animate-spin mr-1" />}
        <span className="pr-2 text-sm hidden sm:block">
          {isWalletLoading
            ? "loading..."
            : isChainSupported
            ? maskedAddr
            : "Unsupported Network"}
        </span>
        {isChainSupported && (
          <span className="pl-2 text-sm text-sm sm:border-l">
            {displayCoin.symbol} {toCurrency(+displayCoin.balance, 3, true)}
          </span>
        )}
      </button>
      {detailsShown && isChainSupported && (
        <Details closeHandler={hideDetails} />
      )}
      {detailsShown && !isChainSupported && (
        <NetworkSelection closeHandler={hideDetails} />
      )}
    </div>
  );
}
