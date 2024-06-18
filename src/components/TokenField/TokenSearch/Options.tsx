import { Combobox } from "@headlessui/react";
import Fuse from "fuse.js/basic";
import useDebouncer from "hooks/useDebouncer";
import React, { useMemo } from "react";
import coins from "./coins.json";
import type { CoinGeckoToken } from "./types";

type Props = {
  classes?: string;
  platFormId: string;
  searchText: string;
};

export default function Options({
  classes = "",
  searchText,
  platFormId,
}: Props) {
  const fuse = useMemo(() => {
    return new Fuse<CoinGeckoToken>(
      coins.filter((f) => platFormId in f.platforms),
      { keys: ["name", "symbol"] }
    );
  }, [platFormId]);

  const [debounced] = useDebouncer(searchText, 500);

  return (
    <Combobox.Options
      className={`${classes} grid grid-cols-[auto_1fr] w-full bg-white dark:bg-blue-d6 shadow-lg rounded max-h-52 overflow-y-auto scroller text-base ring-1 ring-black ring-opacity-5 focus:outline-none`}
    >
      {fuse.search(debounced, { limit: 10 }).map(({ item }) => (
        <Combobox.Option key={item.id} value={item} as={React.Fragment}>
          {({ active, selected }) => (
            <div
              className={`${active ? "bg-[--accent-secondary]" : ""} ${
                selected ? "font-semibold" : "font-normal"
              } col-span-2 grid grid-cols-subgrid items-center gap-2 p-2 cursor-pointer truncate`}
            >
              <span>{item.symbol.toUpperCase()}</span>
              <p className="text-xs text-navy-l4">{item.name}</p>
            </div>
          )}
        </Combobox.Option>
      ))}
    </Combobox.Options>
  );
}
