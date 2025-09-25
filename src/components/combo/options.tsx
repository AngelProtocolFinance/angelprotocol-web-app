import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import type { ReactNode } from "react";

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded-sm overflow-y-scroll scroller";

type Props = {
  query: string;
  options: string[];
  option_disp: (string: string) => ReactNode;
};

export function Options({ query, options, option_disp }: Props) {
  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <ComboboxOptions
      className={containerStyle}
      style={{ height: options.length <= 10 ? "auto" : "10rem" }}
    >
      {(options.length > 0 &&
        filtered.map((country) => (
          <ComboboxOption
            className="data-selected:bg-blue-l2 hover:bg-blue-l2 flex items-center gap-2 p-2 text-sm font-heading"
            key={country}
            value={country}
          >
            {option_disp(country)}
          </ComboboxOption>
        ))) || <div className="p-2 text-sm">{query} not found</div>}
    </ComboboxOptions>
  );
}
