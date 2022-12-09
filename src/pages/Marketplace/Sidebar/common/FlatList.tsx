import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { Checkbox, Drawer } from ".";

export type FlatListOption<T> = {
  value: T;
  displayText: string;
};

type Props<T> = {
  label: string;
  selectedValues: T[];
  options: FlatListOption<T>[];
  onChange: (options: T[]) => void;
};

export function FlatList<T>(props: Props<T>) {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <Listbox
      as="div"
      className="grid gap-4 px-2 py-3 border-b border-gray-l2"
      multiple
      value={props.selectedValues}
      onChange={props.onChange}
    >
      <Drawer isOpen={isOpen} toggle={toggle}>
        <span className="font-bold text-xs font-heading uppercase">
          {props.label}
        </span>
      </Drawer>
      {isOpen && (
        <Listbox.Options static className="grid">
          {props.options.map(({ value, displayText }) => (
            <Listbox.Option
              value={value}
              key={JSON.stringify(value)}
              className="flex items-center gap-4 h-12 p-1 text-sm font-normal font-body cursor-pointer capitalize"
            >
              {({ selected }) => (
                <>
                  <Checkbox checked={selected} readOnly />
                  {displayText}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </Listbox>
  );
}
