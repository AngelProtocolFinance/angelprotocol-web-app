import { Combobox } from "@headlessui/react";
import { initTokenOption } from "components/donation";
import useDebouncer from "hooks/useDebouncer";
import React from "react";
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
  const [debounced] = useDebouncer(searchText, 500);

  const filtered =
    !debounced || debounced.length < 2
      ? []
      : (coins as CoinGeckoToken[])
          .filter((f) => platFormId in f.platforms)
          .filter((f) => {
            const q = debounced.trim().toLowerCase();
            const name = f.name.trim().toLowerCase();
            const symbol = f.symbol.trim();
            return symbol.includes(q) || name.includes(q);
          });

  return (
    <Combobox.Options
      className={`${classes} grid grid-cols-[auto_1fr] w-full bg-white dark:bg-blue-d6 shadow-lg rounded max-h-52 overflow-y-auto scroller text-base ring-1 ring-black ring-opacity-5 focus:outline-none`}
    >
      {filtered.map((item) => (
        <Combobox.Option
          key={item.id}
          value={initTokenOption}
          as={React.Fragment}
        >
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
