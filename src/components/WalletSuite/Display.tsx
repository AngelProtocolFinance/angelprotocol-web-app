import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "components/Icons/Icons";
import { useGetter } from "store/accessors";
import useKeyPress from "hooks/useKeyPress";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { currency_text, denoms } from "constants/currency";
import Details from "./Details";
import useBackdropDismiss from "./useBackdropDismiss";

//this component won't be rendered if wallet is not connected
export default function Display() {
  const { address, displayCoin, icon, isUpdating } = useGetter(
    (state) => state.wallet
  );
  const escKeyPressed = useKeyPress("Escape");
  const ref = useRef<HTMLDivElement>();

  const [detailsShown, showDetails] = useState(false);
  const maskedAddr = maskAddress(address);
  const toggleDetails = () => showDetails((p) => !p);
  const hideDetails = () => showDetails(false);
  const dismissHandler = useBackdropDismiss(hideDetails);

  useEffect(() => {
    if (escKeyPressed && detailsShown) {
      hideDetails();
    }
  }, [escKeyPressed, detailsShown]);

  const handleRef = useCallback(
    (node) => {
      if (node !== null) {
        ref.current = node;
        // document.addEventListener("click", dismissModal);
        dismissHandler(ref);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="flex" ref={handleRef}>
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
          {currency_text[displayCoin.denom as denoms]}{" "}
          {toCurrency(displayCoin.amount, 3, true)}
        </span>
      </button>
      {detailsShown && <Details closeHandler={hideDetails} />}
    </div>
  );
}
