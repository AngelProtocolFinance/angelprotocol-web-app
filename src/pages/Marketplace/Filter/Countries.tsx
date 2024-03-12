import { Combobox } from "@headlessui/react";
import countries from "assets/countries/all.json";
import Icon from "components/Icon";
import { isEmpty } from "helpers";
import { useState } from "react";
import { setCountries } from "slices/components/marketFilter";
import { useGetter, useSetter } from "store/accessors";

export default function Countries() {
  const dispatch = useSetter();
  const selected = useGetter((state) => state.component.marketFilter.countries);
  const [searchText, setSearchText] = useState("");

  const filteredOptions = countries
    .map((c) => c.name)
    .filter((c) => c.toLowerCase().includes(searchText.toLowerCase()));

  function handleChange(countries: string[]) {
    dispatch(setCountries(countries));
  }

  return (
    <Combobox
      value={selected}
      onChange={handleChange}
      as="div"
      className="relative"
      multiple
    >
      <Combobox.Button
        as="div"
        className="flex items-center field-input justify-between cursor-pointer p-1 focus-within:border-gray-d1 focus-within:dark:border-blue-l2"
      >
        <div className="flex flex-wrap gap-2 h-full">
          {selected.map((opt) => (
            <SelectedOption
              key={opt}
              option={opt}
              selected={selected}
              onChange={handleChange}
            />
          ))}

          <div className="inline-flex p-1 items-center gap-2 bg-blue-l5 text-navy-l1 dark:text-navy-l2 rounded">
            <Icon type="Search" size={18} />
            <Combobox.Input
              className="appearance-none bg-transparent focus:outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </Combobox.Button>
      <Combobox.Options className="rounded-sm text-sm border border-gray-l4 absolute top-full mt-2 z-10 bg-gray-l6 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
        {!isEmpty(filteredOptions) &&
          filteredOptions.map((name) => (
            <Combobox.Option
              key={name}
              value={name}
              className={({ active, selected }) =>
                optionStyle(selected, active)
              }
            >
              {name}
            </Combobox.Option>
          ))}
        {isEmpty(filteredOptions) && (
          <p className="text-navy-l1 dark:text-navy-l2 text-sm px-4 py-2">
            No options found
          </p>
        )}
      </Combobox.Options>
    </Combobox>
  );
}

type SelectedProps = {
  option: string;
  selected: string[];
  onChange(value: string[]): void;
};

const optionStyle = (selected: boolean, active: boolean) =>
  `px-4 py-2 cursor-pointer text-sm ${
    selected ? "bg-blue-l4" : active ? "cursor-pointer bg-blue-l5" : ""
  }`;

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
        <Icon type="Close" size={18} />
      </button>
    </div>
  );
}
