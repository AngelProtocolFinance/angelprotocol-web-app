import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import QueryLoader from "components/QueryLoader";
import type { CurrencyOption } from "types/components";
import type { QueryState } from "types/third-party/redux";

type Props = {
  classes?: string;
  currencies: CurrencyOption[] | QueryState<CurrencyOption[]>;
  query: string;
};

export default function CurrencyOptions({
  classes = "",
  currencies = [],
  query,
}: Props) {
  return (
    <QueryLoader
      filterFn={(c) => {
        const formatQuery = query.toLowerCase().replace(/\s+/g, ""); // ignore spaces and casing
        const matchesCode = c.code.toLowerCase().includes(formatQuery);
        const matchesName = c.name
          ?.toLowerCase()
          .replace(/\s+/g, "") // ignore spaces and casing
          .includes(formatQuery);

        return matchesCode || matchesName || false;
      }}
      queryState={
        Array.isArray(currencies)
          ? {
              isLoading: false,
              isFetching: false,
              isError: false,
              data: currencies,
            }
          : currencies
      }
      messages={{
        empty: query ? `${query} not found` : "Nothing found",
        error: "Failed to load currencies",
        loading: <></>,
      }}
      classes={{
        container:
          classes +
          " font-heading bg-white w-full rounded border border-gray-l4 p-2 text-sm text-navy-l1 shadow-lg",
      }}
    >
      {(currencies) => (
        <ComboboxOptions
          anchor="bottom"
          className={`${classes} w-[var(--input-width)] bg-white dark:bg-blue-d6 shadow-lg rounded [--anchor-max-height:13rem] overflow-y-auto scroller text-base ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          {currencies.map(({ code, name, min, rate }) => (
            <ComboboxOption
              key={code}
              value={{ code, name, min, rate }}
              className="flex items-center gap-2 p-2 cursor-pointer truncate data-[selected]:bg-[--accent-secondary] hover:bg-[--accent-secondary]"
            >
              {!!name ? `${code.toUpperCase()} - ${name}` : code.toUpperCase()}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      )}
    </QueryLoader>
  );
}
