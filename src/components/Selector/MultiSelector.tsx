import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import { isEmpty } from "helpers";
import { unpack } from "helpers";
import { fixedForwardRef } from "helpers/react";
import { Search, X } from "lucide-react";
import { type ForwardedRef, type PropsWithChildren, useState } from "react";
import {
  type FieldValues,
  type Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import type { OptionType, ValKey } from "types/components";
import FocusableInput from "./FocusableInput";
import { styles } from "./constants";
import type { ControlledMultiSelectorProps, MultiselectorProps } from "./types";

function _MultiList<T extends ValKey>(
  { children, ...props }: ControlledMultiSelectorProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const cls = unpack(props.classes);
  const [searchText, setSearchText] = useState("");
  const filteredOptions =
    props.searchable && searchText
      ? props.options.filter((o) =>
          o.label.toLowerCase().includes(searchText.toLowerCase())
        )
      : props.options;

  const optionsAvailable = !searchText || !isEmpty(filteredOptions);

  const isAllSelected = props.value.length === props.options.length;

  return (
    <>
      <Combobox
        disabled={props.disabled}
        value={props.value}
        by="value"
        onChange={props.onChange}
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
            {props.value.map((opt) => (
              <SelectedOption
                key={opt.value}
                {...opt}
                onDeselect={(opt) =>
                  props.onChange(
                    props.value.filter((v) => v.value !== opt.value)
                  )
                }
              />
            ))}
            {props.searchable ? (
              <div className="bg-blue-l5 inline-flex items-center gap-2 text-navy-l1 dark:text-navy-l2 pl-3 rounded-sm">
                <Search size={20} />
                <ComboboxInput
                  className="appearance-none bg-transparent first:pl-3 focus:outline-hidden h-10"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            ) : (
              //this will receive focus if search input is not rendered
              <input aria-disabled={true} className="w-0 h-0 appearance-none" />
            )}
          </div>
          <ComboboxButton
            className={`${
              props.value.length > 0
                ? "justify-self-end dark:text-navy-l2 shrink-0"
                : "absolute inset-0 flex justify-end items-center pr-2 rounded-sm active:ring-2 ring-blue-d1 ring-offset-1"
            }`}
          >
            {({ open }) => <DrawerIcon isOpen={open} size={20} className="" />}
          </ComboboxButton>
        </div>
        <ComboboxOptions className={`${styles.options} ${cls.options}`}>
          {optionsAvailable && (
            <div className="flex justify-between p-4">
              {isAllSelected ? (
                <Action onClick={() => props.onChange([])}>Deselect All</Action>
              ) : (
                <Action onClick={() => props.onChange(props.options)}>
                  Select All
                </Action>
              )}
              <Action onClick={props.onReset}>Reset</Action>
            </div>
          )}

          {optionsAvailable &&
            filteredOptions.map((o) => (
              <ComboboxOption key={o.value} value={o} className={styles.option}>
                {o.label}
              </ComboboxOption>
            ))}
          {!optionsAvailable && (
            <p className="text-navy-l1 dark:text-navy-l2 text-sm px-4 py-2">
              No options found
            </p>
          )}
        </ComboboxOptions>
        <p className={styles.error + " empty:hidden"}>{props.error}</p>
      </Combobox>
      {children && children(props.value)}
    </>
  );
}

export const MultiList = fixedForwardRef(_MultiList);

export function MultiSelector<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
>({ name, disabled, ...props }: MultiselectorProps<T, K, V>) {
  ///// ***HOOK FORM*** /////
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange: onSelectedChange, ref },
  } = useController<{ [index: string]: OptionType<V>[] }>({ name: name });
  const { resetField } = useFormContext<T>();

  return (
    <MultiList
      value={selected}
      onChange={onSelectedChange}
      ref={ref}
      onReset={() => resetField(name)}
      error={get(errors, name)?.message}
      disabled={disabled || isSubmitting}
      {...props}
    />
  );
}

type SelectedProps<T extends ValKey> = OptionType<T> & {
  onDeselect: (option: OptionType<T>) => void;
};

function SelectedOption<T extends ValKey>({
  onDeselect,
  ...option
}: SelectedProps<T>) {
  return (
    <div className="flex items-center px-3 gap-2 h-10 bg-blue-l4 dark:bg-blue-d4 border border-gray-l4 rounded-sm font-semibold text-navy-l1 dark:text-navy-l2 uppercase">
      <span className="max-w-[200px] truncate">{option.label}</span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onDeselect(option);
        }}
      >
        <X size={20} />
      </button>
    </div>
  );
}

function Action(props: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button
      type="button"
      className="cursor-pointer text-blue-d1 hover:text-blue hover:underline"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
