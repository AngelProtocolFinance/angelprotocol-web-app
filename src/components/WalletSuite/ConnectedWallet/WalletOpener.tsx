import { useState } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import { maskAddress, toCurrency } from "helpers";
import Details from "./WalletDetails";

//this component won't be rendered if wallet is not connected
export default function WalletOpener() {
  const { wallet, isLoading } = useGetWallet();
  const [detailsShown, setIsDetailsShown] = useState(false);
  const maskedAddr = maskAddress(wallet?.address);
  const toggleDetails = () => setIsDetailsShown((p) => !p);
  const hideDetails = () => detailsShown && setIsDetailsShown(false);

  const { walletIcon, displayCoin } =
    wallet!; /**this component only opens when wallet is connected */
  return (
    <>
      <button
        disabled={isLoading}
        onClick={toggleDetails}
        className="flex items-center py-2 px-3 text-white-grey disabled:text-grey-accent"
      >
        {(!isLoading && (
          <img
            src={walletIcon}
            alt=""
            className="w-6 h-6 object-contain rounded-full mr-0 sm:mr-2 bg-white p-0.5"
          />
        )) || <Icon type="Loading" className="animate-spin mr-1" />}
        <span className="pr-2 text-sm hidden sm:block">
          {isLoading ? "loading..." : maskedAddr}
        </span>
        <span className="pl-2 text-sm text-sm sm:border-l">
          {displayCoin.symbol} {toCurrency(displayCoin.balance, 3, true)}
        </span>
      </button>
      {detailsShown && !isLoading && (
        <Details closeHandler={hideDetails} wallet={wallet!} />
      )}
    </>
  );
}
