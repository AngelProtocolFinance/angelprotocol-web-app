import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useSearchParams } from "@remix-run/react";
import countries from "assets/countries/all.json";
import { isEmpty } from "helpers";
import { SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { toParsed, toRaw } from "../helpers";

export default function Countries() {
  const [params, setParams] = useSearchParams();
  const { countries: pcountries = [], ...p } = toParsed(params);

  const [searchText, setSearchText] = useState("");

  const filteredOptions = countries
    .map((c) => c.name)
    .filter((c) => c.toLowerCase().includes(searchText.toLowerCase()));

  function handleChange(countries: string[]) {
    setParams(toRaw({ ...p, countries }), {
      replace: true,
      preventScrollReset: true,
    });
  }

  return (
    <Combobox
      value={pcountries}
      onChange={handleChange}
      as="div"
      className="relative"
      multiple
    >
      <div className="flex items-center field-input justify-between cursor-pointer p-1 focus-within:border-gray-d1 dark:focus-within:border-blue-l2">
        <div className="flex flex-wrap gap-2 h-full">
          {pcountries.map((opt) => (
            <SelectedOption
              key={opt}
              option={opt}
              selected={pcountries}
              onChange={handleChange}
            />
          ))}

          <div className="inline-flex p-1 items-center gap-2 bg-blue-l5 text-gray dark:text-gray rounded-sm">
            <SearchIcon size={18} />
            <ComboboxInput
              className="appearance-none bg-transparent focus:outline-hidden"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ComboboxOptions className="rounded-xs text-sm border border-gray-l3 absolute top-full mt-2 z-10 bg-gray-l6 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
        {!isEmpty(filteredOptions) &&
          filteredOptions.map((name) => (
            <ComboboxOption key={name} value={name} className={optionStyle}>
              {name}
            </ComboboxOption>
          ))}
        {isEmpty(filteredOptions) && (
          <p className="text-gray dark:text-gray text-sm px-4 py-2">
            No options found
          </p>
        )}
      </ComboboxOptions>
    </Combobox>
  );
}

type SelectedProps = {
  option: string;
  selected: string[];
  onChange(value: string[]): void;
};

const optionStyle =
  "px-4 py-2 cursor-pointer text-sm data-selected:bg-blue-l4 hover:cursor-pointer hover:bg-blue-l5";

function SelectedOption({ selected, onChange, option }: SelectedProps) {
  const handleRemove = (value: string) =>
    onChange(selected.filter((s) => s !== value));

  return (
    <div className="flex gap-2 items-center text-xs pt-1 pb-[.3rem] px-2 bg-blue-l5 border border-gray-l3 rounded-xs">
      <span className="max-w-[200px] truncate">{option}</span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleRemove(option);
        }}
      >
        <X size={18} />
      </button>
    </div>
  );
}
