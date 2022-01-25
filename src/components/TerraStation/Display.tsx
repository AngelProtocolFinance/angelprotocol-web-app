import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { useState } from "react";
import Details from "./Details";
import { useGetter } from "store/accessors";

//this component won't be rendered if wallet is not connected
export default function Display() {
  const { address, displayCoin, icon } = useGetter((state) => state.wallet);

  const [detailsShown, showDetails] = useState(false);
  const maskedAddr = maskAddress(address);
  const toggleDetails = () => showDetails((p) => !p);
  const hideDetails = () => showDetails(false);

  return (
    <div className="flex">
      <button onClick={toggleDetails} className="flex items-center py-2 px-3">
        {/* <img src={terraIcon} alt="" className="w-6 h-6 rounded-full mr-2" /> */}
        <img
          src={icon}
          alt=""
          className="w-6 h-6 object-contain rounded-full mr-0 sm:mr-2 bg-white p-0.5"
        />
        <span className="pr-2 text-sm text-white-grey hidden sm:block">
          {maskedAddr}
        </span>
        <span className="pl-2 text-sm text-sm text-white-grey sm:border-l">
          UST {toCurrency(displayCoin.amount, 3, true)}
        </span>
      </button>
      {detailsShown && <Details closeHandler={hideDetails} />}
    </div>
  );
}
