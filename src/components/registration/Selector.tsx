import { Listbox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import { DrawerIcon } from "components/Icon";
import { errorStyle } from "./constants";

export type OptionType<V> = { label: string; value: V };
type Classes = {
  container?: string;
};

interface Props<T extends FieldValues, K extends Path<T>, V extends string> {
  name: T[K] extends OptionType<V> ? K : never;
  placeholder?: string;
  options: OptionType<V>[];
  disabled?: true;
  classes?: Classes;
  children?: (selected: OptionType<V>) => ReactNode;
}

const labelKey: keyof OptionType<string> = "label";

export function Selector<
  T extends FieldValues,
  K extends Path<T>,
  V extends string
>({ name, disabled, options, children, classes }: Props<T, K, V>) {
  const { container = "" } = classes || {};
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange: onSelectedChange },
  } = useController<{ [index: string]: OptionType<V> }>({ name: name });

  const labelId = `${name}.${labelKey}`;

  return (
    <>
      <Listbox
        disabled={isSubmitting || disabled}
        value={selected}
        onChange={onSelectedChange}
        as="div"
        className={`relative ${container}`}
      >
        <Listbox.Button className="w-full flex justify-between items-center text-sm rounded border px-4 py-3.5 border-gray-l2 focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 dark:border-bluegray bg-gray-l5 dark:bg-blue-d4 disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1">
          {({ open }) => (
            <>
              <span>{selected.label}</span>
              <DrawerIcon isOpen={open} size={25} className="dark:text-gray" />
            </>
          )}
        </Listbox.Button>
        <Listbox.Options className="rounded-sm text-sm border border-gray-l2 dark:border-bluegray absolute top-full mt-2 z-20 bg-gray-l5 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
          {options.map((option) => (
            <Option key={option.value} {...option} />
          ))}
        </Listbox.Options>
        <ErrorMessage
          name={labelId}
          errors={errors}
          as="p"
          className={errorStyle}
        />
      </Listbox>
      {children && children(selected)}
    </>
  );
}

function Option<V extends string>(o: OptionType<V>) {
  return (
    <Listbox.Option
      value={o}
      className={({ active }) =>
        `px-4 py-2 cursor-pointer ${active ? "bg-blue-l2 dark:bg-blue-d2" : ""}`
      }
    >
      {o.label}
    </Listbox.Option>
  );
}
