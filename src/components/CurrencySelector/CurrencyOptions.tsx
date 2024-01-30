import { Combobox } from "@headlessui/react";
import QueryLoader from "components/QueryLoader";
import { Currency } from "types/components";
import { QueryState } from "types/third-party/redux";

type Props = {
  classes?: string;
  currencies: Currency[] | QueryState<Currency[]>;
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
          " bg-white w-full rounded border border-prim p-2 text-sm text-gray-d1 shadow-lg",
      }}
    >
      {(currencies) => (
        <Combobox.Options
          className={`${classes} w-full bg-white dark:bg-blue-d6 shadow-lg rounded max-h-52 overflow-y-auto scroller text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
        >
          {currencies.map(({ code, name, min }) => (
            <Combobox.Option key={code} value={{ code, name, min }}>
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
          ))}
        </Combobox.Options>
      )}
    </QueryLoader>
  );
}