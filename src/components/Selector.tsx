import { Listbox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
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

interface Props<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
  M extends boolean
> {
  name: T[K] extends VarOption<M, V> ? K : never;
  multiple?: M;
  placeholder?: string;
  options: OptionType<V>[];
  disabled?: true;
  classes?: Classes;
  children?: (selected: VarOption<M, V>) => ReactNode;
}

export const selectorButtonStyle =
  "flex items-center text-sm rounded border border-prim";

const SELECT_ALL: OptionType<string> = { label: "Select All", value: "*" };

const labelKey: keyof OptionType<string> = "label";

export function Selector<
  T extends FieldValues,
  K extends Path<T>,
  ValueType extends ValKey,
  Multiple extends boolean
>({
  name,
  disabled,
  options,
  children,
  classes,
  multiple,
}: Props<T, K, ValueType, Multiple>) {
  const { container = "", button = "" } = classes || {};
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange },
  } = useController<{ [index: string]: VarOption<Multiple, ValueType> }>({
    name: name as any,
  });

  const labelId = `${name}.${labelKey}`;
  const valueKey: keyof OptionType<ValueType> = "value";

  const allOptions = multiple ? [SELECT_ALL, ...options] : options;

  return (
    <>
      <Listbox
        disabled={isSubmitting || disabled}
        value={selected}
        by={valueKey}
        onChange={(e) => {
          console.log(e);
          onChange(e);
        }}
        as="div"
        className={`relative ${container}`}
        multiple={multiple}
      >
        <Listbox.Button
          className={`${button} ${selectorButtonStyle} px-4 py-3.5 justify-between w-full focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1`}
        >
          {({ open }) => (
            <>
              <span className={multiple ? "truncate" : ""}>
                {getDisplay(selected)}
              </span>
              <DrawerIcon isOpen={open} size={25} className="dark:text-gray" />
            </>
          )}
        </Listbox.Button>
        <Listbox.Options className="rounded-sm text-sm border border-prim absolute top-full mt-2 z-20 bg-gray-l5 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
          {allOptions.map((o) => (
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
        <ErrorMessage
          /**single value, could just validate option.label. multiple on the other hand, should validate option[]*/
          name={(multiple ? name : labelId) as any}
          errors={errors}
          as="p"
          className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
        />
      </Listbox>
      {children && children(selected as any)}
    </>
  );
}

function getDisplay(selected: VarOption<any, any>) {
  return Array.isArray(selected)
    ? selected.map((s) => s.label).join(" , ")
    : selected.label;
}
