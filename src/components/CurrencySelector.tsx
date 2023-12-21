import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { WiseCurrency } from "types/aws";
import CurrencyOptions from "./CurrencySelector2/CurrencyOptions";
import { DrawerIcon } from "./Icon";
import { Label } from "./form";

export type Currency = { code: string; name?: string };

type Props = {
  classes?: { combobox?: string };
  currencies: Currency[];
  disabled: boolean;
  value: Currency;
  label: string;
  onChange: (currency: Currency) => void;
};

export default function CurrencySelector(props: Props) {
  const [query, setQuery] = useState("");

  const filteredCurrencies = props.currencies.filter((c) => {
    // check whether query matches either the currency name or any of its keywords
    const formatQuery = query.toLowerCase().replace(/\s+/g, ""); // ignore spaces and casing
    const matchesCode = c.code.toLowerCase().includes(formatQuery);
    const matchesName = c.name
      ?.toLowerCase()
      .replace(/\s+/g, "") // ignore spaces and casing
      .includes(formatQuery);

    return matchesCode || matchesName;
  });

  return (
    <div className="field">
      <Label htmlFor="wise__currency" required aria-required>
        {props.label}
      </Label>
      <Combobox
        by="code"
        value={props.value}
        onChange={props.onChange}
        as="div"
        className={`relative items-center grid grid-cols-[1fr_auto] field-container ${
          props.classes?.combobox || ""
        }`}
      >
        <Combobox.Input
          id="wise__currency"
          className="w-full border-r border-gray-l3 dark:border-bluegray px-4 py-3.5 text-sm leading-5 text-gray-900 focus:ring-0"
          displayValue={(currency: WiseCurrency) =>
            !!currency.name
              ? `${currency.code} - ${currency.name}`
              : currency.code
          }
          onChange={(event) => setQuery(event.target.value)}
          spellCheck={false}
        />
        <Combobox.Button className="flex items-center px-2">
          {({ open }) => (
            <DrawerIcon
              isOpen={open}
              size={25}
              className="h-full w-full text-gray-400"
              aria-hidden
            />
          )}
        </Combobox.Button>

        <CurrencyOptions
          classes="absolute top-full mt-2 z-10"
          currencies={filteredCurrencies}
        />
      </Combobox>
    </div>
  );
}
