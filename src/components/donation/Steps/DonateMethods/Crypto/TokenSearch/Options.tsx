import { Combobox } from "@headlessui/react";
import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { initTokenOption } from "components/donation";
import useDebouncer from "hooks/useDebouncer";
import { useTokensQuery } from "services/coingecko";

type Props = {
  classes?: string;
  searchText: string;
};

export default function Options({ classes = "", searchText }: Props) {
  const [debouncedSearchText] = useDebouncer(searchText, 500);
  const tokensQuery = useTokensQuery(debouncedSearchText);

  return (
    <QueryLoader
      queryState={tokensQuery}
      messages={{
        empty: debouncedSearchText
          ? `${debouncedSearchText} not found`
          : "Nothing found",
        error: "Failed to search token",
        loading: <></>,
      }}
      classes={{
        container:
          classes +
          " font-heading bg-white w-full rounded border border-gray-l4 p-2 text-sm text-navy-l1 shadow-lg",
      }}
    >
      {(tokens) => (
        <Combobox.Options
          className={`${classes} w-full bg-white dark:bg-blue-d6 shadow-lg rounded max-h-52 overflow-y-auto scroller text-base ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          {tokens.map(({ id, thumb, symbol, name }) => (
            <Combobox.Option key={id} value={initTokenOption}>
              {({ active, selected }) => (
                <div
                  className={`${active ? "bg-[--accent-secondary]" : ""} ${
                    selected ? "font-semibold" : "font-normal"
                  } grid grid-cols-[auto_1fr] items-center gap-2 p-2 cursor-pointer truncate`}
                >
                  <Image src={thumb} className="size-5 rounded-full" />
                  <span>{symbol}</span>
                  <p className="col-span-full text-xs text-navy-l4">{name}</p>
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </QueryLoader>
  );
}
