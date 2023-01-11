import { Listbox } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { DrawerIcon } from "components/Icon";

type ValKey = string | number;

export type OptionType<V> = { label: string; value: V };
type Classes = {
  container?: string;
  button?: string;
};

type VarOption<M extends boolean, V extends ValKey> = M extends true
  ? OptionType<V>[]
  : OptionType<V>;

interface Props<V extends ValKey, M extends boolean> {
  multiple?: M;
  options: OptionType<V>[];
  selectedOptions?: VarOption<M, V>;
  disabled?: true;
  classes?: Classes;
  onChange?: (newValues: VarOption<M, V>) => void;
}

export default function Selector<
  ValueType extends ValKey,
  Multiple extends boolean
>({
  disabled,
  options,
  classes,
  multiple,
  selectedOptions,
  onChange,
  children,
}: PropsWithChildren<Props<ValueType, Multiple>>) {
  const { container = "", button = "" } = classes || {};
  const valueKey: keyof OptionType<ValueType> = "value";
  return (
    <Listbox
      disabled={disabled}
      value={selectedOptions}
      by={valueKey}
      onChange={onChange}
      as="div"
      className={`relative ${container}`}
      multiple={multiple}
    >
      <Listbox.Button
        className={`${button} w-full flex justify-between items-center text-sm rounded border px-4 py-3.5 border-gray-l2 focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 dark:border-bluegray disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1`}
      >
        {({ open }) => (
          <>
            <span className={multiple ? "truncate" : ""}>
              {getDisplay(selectedOptions)}
            </span>
            <DrawerIcon isOpen={open} size={25} className="dark:text-gray" />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className="rounded-sm text-sm border border-gray-l2 dark:border-bluegray absolute top-full mt-2 z-20 bg-gray-l5 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
        {options.map((o) => (
          <Listbox.Option
            key={o.value}
            value={o}
            className={({ active, selected }) => {
              return `px-4 py-2 cursor-pointer ${
                selected
                  ? "bg-blue-l2  dark:bg-blue-d1"
                  : active
                  ? "cursor-pointer bg-blue-l3 dark:bg-blue-d2"
                  : ""
              }`;
            }}
          >
            {o.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
      {children}
    </Listbox>
  );
}

function getDisplay(selected?: VarOption<any, any>): string {
  if (!selected) {
    return "";
  }

  return Array.isArray(selected)
    ? selected.map((s) => s.label).join(" , ")
    : selected.label;
}
