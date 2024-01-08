import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { WiseCurrency } from "types/aws";
import { DrawerIcon } from "components/Icon";
import { Label } from "components/form";
import CurrencyOptions from "./CurrencyOptions";

export type Currency = {
  code: string;
  name: string;
};

type Props = {
  classes: { combobox: string };
  value: Currency;
  onChange: (currency: Currency) => void;
};

export default function CurrencySelector(props: Props) {
  const [query, setQuery] = useState("");

  return (
    <div className="field">
      <Label htmlFor="wise__currency" required aria-required>
        Select your bank account currency:
      </Label>
      <Combobox
        by="code"
        value={props.value}
        onChange={props.onChange}
        as="div"
        className={`relative items-center grid grid-cols-[1fr_auto] field-container ${props.classes.combobox}`}
      >
        <Combobox.Input
          id="wise__currency"
          className="w-full border-r border-gray-l3 dark:border-bluegray px-4 py-3.5 text-sm leading-5 text-gray-900 focus:ring-0"
          displayValue={(currency: WiseCurrency) =>
            `${currency.code} - ${currency.name}`
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
          searchText={query}
        />
      </Combobox>
    </div>
  );
}
