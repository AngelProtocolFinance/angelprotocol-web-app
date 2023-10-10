import { Listbox } from "@headlessui/react";
import { GroupProps } from "./types";

export function FlatFilter<T>(props: GroupProps<T>) {
  return (
    <Listbox
      as="div"
      className="grid gap-4 py-4 border-b border-prim"
      multiple
      value={props.selectedValues}
      onChange={props.onChange}
    >
      <span className="font-bold text-md font-heading uppercase">
        {props.label}
      </span>
      <Listbox.Options
        static
        className={`
        ${props.classes ? props.classes : "flex flex-wrap float"}
        gap-y-2`}
      >
        {props.options.map((option) => (
          <Listbox.Option
            value={option.value}
            key={option.key}
            className="h-8 p-1 cursor-pointer capitalize"
          >
            {({ selected }) => (
              <>
                <span
                  className={`text-xs border rounded-xl p-2 ${
                    selected ? "text-orange" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    className="hidden"
                    readOnly
                  />
                  {option.displayText}
                </span>
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
