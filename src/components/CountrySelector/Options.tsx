import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { isEmpty } from "helpers";
import type { Country } from "types/components";

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded-sm overflow-y-scroll scroller";

type Props = {
  query: string;
  options: Country[];
};

export default function Options({ query, options }: Props) {
  const filtered = options.filter((o) =>
    o.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  return (
    <ComboboxOptions
      className={containerStyle}
      style={{ height: options.length <= 10 ? "auto" : "10rem" }}
    >
      {(!isEmpty(options) &&
        filtered.map((country) => (
          <ComboboxOption
            className="data-selected:bg-blue-l2 hover:bg-blue-l2 flex items-center gap-2 p-2 text-sm font-heading"
            key={country.name}
            value={country}
          >
            <span className="text-2xl">{country.flag}</span>
            <span>{country.name}</span>
          </ComboboxOption>
        ))) || <div className="p-2 text-sm">{query} not found</div>}
    </ComboboxOptions>
  );
}
