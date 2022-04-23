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

  return (
    <div className="w-115 flex items-center box-border border-l pl-1">
      <CurrencySelector />
    </div>
  );
}

export default memo(Currency);
/* {showExtra && <Icon type="ChevronDown" className="font-bold text-md" />} */
