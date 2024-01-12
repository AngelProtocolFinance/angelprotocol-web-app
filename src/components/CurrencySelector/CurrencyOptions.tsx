import { Combobox } from "@headlessui/react";
import { Currency } from "./types";
import { isEmpty } from "helpers";

type Props = {
  classes?: string;
  currencies: Currency[];
};

export default function CurrencyOptions({
  classes = "",
  currencies = [],
}: Props) {
  return (
    <Combobox.Options
      className={`${classes} w-full bg-white dark:bg-blue-d6 shadow-lg rounded max-h-52 overflow-y-auto scroller text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
    >
      {isEmpty(currencies) ? (
        <div className="p-2 text-sm cursor-default">Nothing found</div>
      ) : (
        currencies.map(({ code, name }) => (
          <Combobox.Option key={code} value={{ code, name }}>
            {({ active, selected }) => (
              <div
                className={`${active ? "bg-blue-l2 dark:bg-blue-d1" : ""} ${
                  selected ? "font-semibold" : "font-normal"
                } flex items-center gap-2 p-2 text-sm cursor-pointer truncate`}
              >
                {!!name
                  ? `${code.toUpperCase()} - ${name}`
                  : code.toUpperCase()}
              </div>
            )}
          </Combobox.Option>
        ))
      )}
    </Combobox.Options>
  );
}
