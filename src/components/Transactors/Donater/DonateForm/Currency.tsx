import { memo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Providers } from "services/wallet/types";
import Icon from "components/Icons/Icons";
import { DonateValues } from "components/Transactors/Donater/types";
import { useGetter } from "store/accessors";
import { currency_icons, currency_text } from "constants/currency";
import CurrencySelector from "./CurrencySelector";

function Currency() {
  const { watch } = useFormContext<DonateValues>();
  const selectedCurrency = watch("currency");
  const { active: activeProvider } = useGetter((state) => state.provider);
  const showExtra = activeProvider === Providers.terra;
  const [showSelector, setShowSelector] = useState(false);

  const showModal = () => showExtra && setShowSelector(true);
  const dismissModal = () => setShowSelector(false);

  return (
    <div className="w-109 relative flex items-center p-2 border-l border-black">
      <div
        className="w-full uppercase flex items-center justify-between text-sm cursor-pointer"
        onClick={showModal}
      >
        <div className="flex items-center">
          <img
            src={currency_icons[selectedCurrency]}
            alt={`${selectedCurrency} icon`}
            className="w-4 h-4 object-contain mr-0.5"
          />
          <span className="text-angel-grey mx-1">
            {currency_text[selectedCurrency]}
          </span>
        </div>

        {showExtra && <Icon type="ChevronDown" className="font-bold text-md" />}
      </div>
      {showSelector && <CurrencySelector closeHandler={dismissModal} />}
    </div>
  );
}

export default memo(Currency);
