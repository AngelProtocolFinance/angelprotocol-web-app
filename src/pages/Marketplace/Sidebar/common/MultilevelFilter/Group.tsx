import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { GroupProps } from "../types";
import { Drawer } from "..";

export default function Group<T>(props: GroupProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const isAllSelected = props.selectedValues.length === props.options.length;

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  function toggleGroup() {
    props.onChange(isAllSelected ? [] : props.options.map((o) => o.value));
  }

  return (
    <Listbox
      as="div"
      className="grid gap-4"
      multiple
      value={props.selectedValues}
      onChange={props.onChange}
    >
      <div className="flex items-center gap-4 h-8 p-1 cursor-pointer">
        <input
          type="checkbox"
          className="checkbox checkbox-marketplace"
          checked={isAllSelected}
          onChange={toggleGroup}
        />
        <Drawer isOpen={isOpen} toggle={toggle}>
          <span className="text-sm font-bold font-body capitalize">
            {props.label}
          </span>
        </Drawer>
      </div>

      {isOpen && (
        <Listbox.Options static className="flex flex-col gap-4">
          {props.options.map((option) => (
            <Listbox.Option
              value={option.value}
              key={option.key}
              className="flex items-center gap-4 w-fit h-8 p-1 pl-4 text-sm font-normal font-body cursor-pointer capitalize"
            >
              {({ selected }) => (
                <>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-marketplace"
                    checked={selected}
                    readOnly
                  />
                  {option.displayText}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </Listbox>
  );
}
