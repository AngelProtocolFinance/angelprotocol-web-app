import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { DrawerIcon } from "components/icon";
import { fixedForwardRef } from "helpers/react";
import { unpack } from "helpers/unpack";
import { Search, X } from "lucide-react";
import {
  type ForwardedRef,
  type PropsWithChildren,
  type ReactNode,
  useState,
} from "react";

import { styles } from "./constants";
import FocusableInput from "./focusable-input";
import type { BaseProps } from "./types";

export interface Props<T extends string> extends BaseProps {
  searchable?: true;
  values: T[];
  on_change: (opts: T[]) => void;
  on_reset: () => void;
  options: T[];
  option_disp: (opt: T) => ReactNode;
  children?: (values: T[]) => ReactNode;

  error?: string;
  label?: ReactNode;
  required?: boolean;
}

function _MultiCombo<T extends string>(
  { children, ...props }: Props<T>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const cls = unpack(props.classes);
  const [query, set_query] = useState("");
  const filteredOptions =
    props.searchable && query
      ? props.options.filter((o) =>
          o.toLowerCase().includes(query.toLowerCase())
        )
      : props.options;

  const optionsAvailable = !query || filteredOptions.length > 0;

  const is_all_selected = props.values.length === props.options.length;

  return (
    <>
      <Combobox
        disabled={props.disabled}
        value={props.values}
        onChange={props.on_change}
        as="div"
        className={`relative ${cls.container}`}
        multiple
      >
        <FocusableInput ref={ref} />
        <div
          aria-invalid={!!props.error}
          aria-disabled={props.disabled}
          className={`${cls.button} ${styles.selectorButton} flex flex-wrap gap-2 h-full focus-within:ring-2 ring-blue-d1 ring-offset-1 aria-invalid:border-red p-1`}
        >
          <div className="flex flex-wrap gap-2 h-full">
            {props.values.map((v) => (
              <SelectedOption
                option={v}
                option_disp={props.option_disp}
                key={v}
                on_deselect={(opt) =>
                  props.on_change(props.values.filter((v) => v !== opt))
                }
              />
            ))}
            {props.searchable ? (
              <div className="bg-blue-l5 inline-flex items-center gap-2 text-gray dark:text-gray pl-3 rounded-sm">
                <Search size={20} />
                <ComboboxInput
                  className="appearance-none bg-transparent first:pl-3 focus:outline-hidden h-10"
                  value={query}
                  onChange={(e) => set_query(e.target.value)}
                />
              </div>
            ) : (
              //this will receive focus if search input is not rendered
              <input aria-disabled={true} className="w-0 h-0 appearance-none" />
            )}
          </div>
          <ComboboxButton
            className={`${
              props.values.length > 0
                ? "justify-self-end dark:text-gray shrink-0 pr-2"
                : "absolute inset-0 flex justify-end items-center pr-4 rounded-sm active:ring-2 ring-blue-d1 ring-offset-1"
            }`}
          >
            {({ open }) => <DrawerIcon isOpen={open} size={20} className="" />}
          </ComboboxButton>
        </div>
        <ComboboxOptions className={`selector-opts ${cls.options}`}>
          {optionsAvailable && (
            <div className="flex justify-between p-4">
              {is_all_selected ? (
                <Action on_click={() => props.on_change([])}>
                  Deselect All
                </Action>
              ) : (
                <Action on_click={() => props.on_change(props.options)}>
                  Select All
                </Action>
              )}
              <Action on_click={props.on_reset}>Reset</Action>
            </div>
          )}

          {optionsAvailable &&
            filteredOptions.map((o) => (
              <ComboboxOption
                key={o}
                value={o}
                className={`${cls.option} selector-opt`}
              >
                {props.option_disp(o)}
              </ComboboxOption>
            ))}
          {!optionsAvailable && (
            <p className="text-gray dark:text-gray text-sm px-4 py-2">
              No options found
            </p>
          )}
        </ComboboxOptions>
        <p className={styles.error + " empty:hidden"}>{props.error}</p>
      </Combobox>
      {children && children(props.values)}
    </>
  );
}

export const MultiCombo = fixedForwardRef(_MultiCombo);

type ISelectedOption<T extends string> = {
  option: T;
  option_disp: (opt: T) => ReactNode;
  on_deselect: (option: T) => void;
};

function SelectedOption<T extends string>({
  on_deselect,
  option,
  option_disp,
}: ISelectedOption<T>) {
  return (
    <div className="flex items-center px-3 gap-2 h-10 bg-blue-l4 dark:bg-blue-d4 border border-gray-l3 rounded-sm font-semibold text-gray dark:text-gray uppercase">
      <span className="max-w-[200px] truncate">{option_disp(option)}</span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          on_deselect(option);
        }}
      >
        <X size={20} />
      </button>
    </div>
  );
}

function Action(props: PropsWithChildren<{ on_click: () => void }>) {
  return (
    <button
      type="button"
      className="cursor-pointer text-blue-d1 hover:text-blue hover:underline"
      onClick={props.on_click}
    >
      {props.children}
    </button>
  );
}
