import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { useState } from "react";
import Details from "./Details";
import { useGetter } from "store/accessors";
import { currency_text } from "constants/currency";
import Icon from "components/Icons/Icons";

//this component won't be rendered if wallet is not connected
export default function Display() {
  const { address, displayCoin, icon, isUpdating } = useGetter(
    (state) => state.wallet
  );

  const [detailsShown, setIsDetailsShown] = useState(false);
  const maskedAddr = maskAddress(address);
  const toggleDetails = () => setIsDetailsShown((p) => !p);
  const hideDetails = () => detailsShown && setIsDetailsShown(false);

  return (
    <div className="flex">
      <button
        disabled={isUpdating}
        onClick={toggleDetails}
        className="flex items-center py-2 px-3 text-white-grey disabled:text-grey-accent"
      >
        {/* <img src={terraIcon} alt="" className="w-6 h-6 rounded-full mr-2" /> */}
        {(!isUpdating && (
          <img
            src={icon}
            alt=""
            className="w-6 h-6 object-contain rounded-full mr-0 sm:mr-2 bg-white p-0.5"
          />
        )) || <Icon type="Loading" className="animate-spin mr-1" />}
        <span className="pr-2 text-sm hidden sm:block">
          {isUpdating ? "loading..." : maskedAddr}
        </span>
        <span className="pl-2 text-sm text-sm sm:border-l">
          {currency_text[displayCoin.denom]}{" "}
          {toCurrency(displayCoin.amount, 3, true)}
        </span>
      </button>
      {detailsShown && <Details closeHandler={hideDetails} />}
    </div>
  );
}
