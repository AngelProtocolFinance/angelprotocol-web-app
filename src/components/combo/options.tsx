import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import type { ReactNode } from "react";

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
      anchor={{ to: "bottom", gap: 4 }}
      className="bg-white w-(--input-width) rounded shadow-2xl/20"
    >
      {query && filtered.length === 0 ? (
        <div className="p-2 text-sm text-gray-d1">{query} not found</div>
      ) : null}
      {filtered.slice(0, 5).map((v) => (
        <ComboboxOption
          className="data-selected:bg-blue-l2 hover:bg-blue-l2 flex items-center gap-2 p-2 text-sm "
          key={v}
          value={v}
        >
          {option_disp(v)}
        </ComboboxOption>
      ))}
      {/* {(options.length > 0 &&
        filtered.slice(0, 5).map((country) => (
          <ComboboxOption
            className="data-selected:bg-blue-l2 hover:bg-blue-l2 flex items-center gap-2 p-2 text-sm "
            key={country}
            value={country}
          >
            {option_disp(country)}
          </ComboboxOption>
        ))) || (
        <div className="p-2 text-sm text-gray-d1">{query} not found</div>
      )} */}
    </ComboboxOptions>
  );
}
