import { Combobox } from "@headlessui/react";
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
        <Combobox.Options
          className={`${classes} w-full bg-white dark:bg-blue-d6 shadow-lg rounded max-h-52 overflow-y-auto scroller text-base ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          {currencies.map(({ code, name, min, rate }) => (
            <Combobox.Option key={code} value={{ code, name, min, rate }}>
              {({ active, selected }) => (
                <div
                  className={`${active ? "bg-[--accent-secondary]" : ""} ${
                    selected ? "font-semibold" : "font-normal"
                  } flex items-center gap-2 p-2 cursor-pointer truncate`}
                >
                  {!!name
                    ? `${code.toUpperCase()} - ${name}`
                    : code.toUpperCase()}
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </QueryLoader>
  );
}
