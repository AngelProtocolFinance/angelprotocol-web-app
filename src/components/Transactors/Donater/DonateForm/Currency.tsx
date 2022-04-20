import { memo, useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Icon from "components/Icons/Icons";
import { DonateValues } from "components/Transactors/Donater/types";
import useBackdropDismiss from "components/WalletSuite/useBackdropDismiss";
import useTooltip from "hooks/useTooltip";
import { currency_icons, currency_text } from "constants/currency";
import CurrencySelector from "./CurrencySelector";

type Props = {
  withTooltip?: true;
};

function Currency(props: Props) {
  const ref = useRef<HTMLDivElement>();
  const { enter, exit, Tooltip } = useTooltip(Tooltip_);
  const { register, watch } = useFormContext<DonateValues>();
  const selectedCurrency = watch("currency");
  const [showSelector, setShowSelector] = useState(false);

  const dismissModal = () => setShowSelector(false);
  const dismissHandler = useBackdropDismiss(dismissModal);

  const handleRef = useCallback(
    (node) => {
      if (node !== null) {
        ref.current = node;
        dismissHandler(ref);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      ref={handleRef}
      onMouseEnter={enter}
      onMouseLeave={exit}
      className={`relative flex items-center bg-angel-blue/10 shadow-inner-white-grey p-2 rounded-md ${
        props.withTooltip ? "cursor-pointer" : ""
      }`}
    >
      <input
        disabled={props.withTooltip}
        id={selectedCurrency}
        {...register("currency")}
        value={selectedCurrency}
        type="radio"
        className="w-0 h-0 appearance-none"
      />
      <label
        htmlFor={selectedCurrency}
        className="uppercase flex items-center text-sm cursor-pointer"
        onClick={() => setShowSelector(true)}
      >
        <img
          src={currency_icons[selectedCurrency]}
          alt=""
          className="w-4 h-4 object-contain"
        />
        <span
          className={`${
            props.withTooltip ? "text-grey-accent" : "text-angel-grey"
          } ml-0.5 mr-1`}
        >
          {currency_text[selectedCurrency]}
        </span>
        <Icon type="ChevronDown" className="font-bold text-md" />
      </label>
      {props.withTooltip && <Tooltip />}
      {showSelector && <CurrencySelector closeHandler={dismissModal} />}
    </div>
  );
}

export default memo(Currency);

function Tooltip_() {
  return (
    <span className="fixed bg-white text-angel-grey p-1.5 rounded-md text-sm shadow-md z-10">
      coming soon!
    </span>
  );
}
