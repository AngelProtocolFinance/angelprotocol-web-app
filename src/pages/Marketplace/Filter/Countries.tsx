import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import countries from "assets/countries/all.json";
import { isEmpty } from "helpers";
import { SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { useMarketplaceContext } from "../Context";

export default function Countries() {
  const { state, update } = useMarketplaceContext();
  const [searchText, setSearchText] = useState("");

  const filteredOptions = countries
    .map((c) => c.name)
    .filter((c) => c.toLowerCase().includes(searchText.toLowerCase()));

  function handleChange(countries: string[]) {
    update({ countries });
  }

  return (
    <Combobox
      value={state.countries}
      onChange={handleChange}
      as="div"
      className="relative"
      multiple
    >
      <div className="flex items-center field-input justify-between cursor-pointer p-1 focus-within:border-gray-d1 focus-within:dark:border-blue-l2">
        <div className="flex flex-wrap gap-2 h-full">
          {state.countries.map((opt) => (
            <SelectedOption
              key={opt}
              option={opt}
              selected={state.countries}
              onChange={handleChange}
            />
          ))}

          <div className="inline-flex p-1 items-center gap-2 bg-blue-l5 text-navy-l1 dark:text-navy-l2 rounded">
            <SearchIcon size={18} />
            <ComboboxInput
              className="appearance-none bg-transparent focus:outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ComboboxOptions className="rounded-sm text-sm border border-gray-l4 absolute top-full mt-2 z-10 bg-gray-l6 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
        {!isEmpty(filteredOptions) &&
          filteredOptions.map((name) => (
            <ComboboxOption key={name} value={name} className={optionStyle}>
              {name}
            </ComboboxOption>
          ))}
        {isEmpty(filteredOptions) && (
          <p className="text-navy-l1 dark:text-navy-l2 text-sm px-4 py-2">
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
  "px-4 py-2 cursor-pointer text-sm data-[selected]:bg-blue-l4 hover:cursor-pointer hover:bg-blue-l5";

function SelectedOption({ selected, onChange, option }: SelectedProps) {
  const handleRemove = (value: string) =>
    onChange(selected.filter((s) => s !== value));

  return (
    <div className="flex gap-2 items-center text-xs pt-1 pb-[.3rem] px-2 bg-blue-l5 border border-gray-l4 rounded-sm">
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
