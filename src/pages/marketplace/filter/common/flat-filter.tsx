import { Listbox, ListboxOption, ListboxOptions } from "@headlessui/react";
import type { GroupProps } from "./types";

export function FlatFilter<T>(props: GroupProps<T>) {
  return (
    <Listbox
      as="div"
      className="grid px-2 py-4"
      multiple
      value={props.selectedValues}
      onChange={props.onChange}
    >
      <label className="font-semibold text-xs  uppercase mb-2">
        {props.label}
      </label>
      <ListboxOptions static className="flex flex-wrap gap-x-1 gap-y-2">
        {props.options.map((option) => (
          <ListboxOption
            value={option.value}
            key={option.key}
            className={({ selected }) =>
              `${
                selected
                  ? "border-blue-d1 text-blue-d4 bg-blue-l5"
                  : "border-gray-l3"
              } border select-none rounded-full cursor-pointer capitalize text-xs pt-1 pb-[.3rem] px-4`
            }
          >
            {option.displayText}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
