import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import Icon, { DrawerIcon } from "components/Icon";
import { isEmpty, unpack } from "helpers";
import { type PropsWithChildren, useState } from "react";
import {
  type FieldValues,
  type Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import type { OptionType, ValKey } from "types/components";
import FocusableInput from "./FocusableInput";
import { styles, valueKey } from "./constants";
import type { MultiselectorProps } from "./types";

export function MultiSelector<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
>({
  name,
  disabled,
  options,
  children,
  classes,
  searchable,
}: MultiselectorProps<T, K, V>) {
  const cls = unpack(classes);

  ///// ***HOOK FORM*** /////
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange: onSelectedChange, ref },
  } = useController<{ [index: string]: OptionType<V>[] }>({ name: name });
  const { resetField } = useFormContext<T>();

  /// **SEARCH** ///
  const [searchText, setSearchText] = useState("");
  const filteredOptions =
    searchable && searchText
      ? options.filter((o) =>
          o.label.toLowerCase().includes(searchText.toLowerCase())
        )
      : options;

  const optionsAvailable = !searchText || !isEmpty(filteredOptions);

  const isAllSelected = selected.length === options.length;
  const isDisabled = isSubmitting || disabled;
  const invalid = !!get(errors, name)?.message;

  return (
    <>
      <Combobox
        disabled={isDisabled}
        value={selected}
        by={valueKey}
        onChange={onSelectedChange}
        as="div"
        className={`relative ${cls.container}`}
        multiple
      >
        <FocusableInput ref={ref} />
        <Combobox.Button
          aria-invalid={invalid}
          aria-disabled={isDisabled}
          as="div"
          className={`${cls.button} ${styles.selectorButton} focus-within:ring-2 ring-blue-d1 ring-offset-1 aria-invalid:border-red p-1`}
        >
          {({ open }) => (
            <>
              <span className="flex flex-wrap gap-2 h-full">
                {selected.map((opt) => (
                  <SelectedOption
                    key={opt.value}
                    option={opt}
                    selected={selected}
                    onChange={onSelectedChange}
                  />
                ))}
                {searchable ? (
                  <div className="inline-flex items-center gap-2 text-navy-l1 dark:text-navy-l2 pl-3 bg-white/5 rounded">
                    <Icon type="Search" size={20} />
                    <Combobox.Input
                      className="appearance-none bg-transparent first:pl-3 focus:outline-none h-10"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                ) : (
                  //this will receive focus if search input is not rendered
                  <input
                    aria-disabled={true}
                    className="w-0 h-0 appearance-none"
                  />
                )}
              </span>
              <DrawerIcon
                isOpen={open}
                size={25}
                className="justify-self-end dark:text-navy-l2 shrink-0"
              />
            </>
          )}
        </Combobox.Button>
        <Combobox.Options className={`${styles.options} ${cls.options}`}>
          {optionsAvailable && (
            <div className="flex justify-between p-4">
              {isAllSelected ? (
                <Action onClick={() => onSelectedChange([])}>
                  Deselect All
                </Action>
              ) : (
                <Action onClick={() => onSelectedChange(options)}>
                  Select All
                </Action>
              )}

              <Action onClick={() => resetField(name)}>Reset</Action>
            </div>
          )}

          {optionsAvailable &&
            filteredOptions.map((o) => (
              <Combobox.Option
                key={o.value}
                value={o}
                className={({ active, selected }) =>
                  styles.option(selected, active)
                }
              >
                {o.label}
              </Combobox.Option>
            ))}
          {!optionsAvailable && (
            <p className="text-navy-l1 dark:text-navy-l2 text-sm px-4 py-2">
              No options found
            </p>
          )}
        </Combobox.Options>
        <ErrorMessage
          name={name}
          errors={errors}
          as="p"
          className={styles.error}
        />
      </Combobox>
      {children && children(selected)}
    </>
  );
}

type SelectedProps<T extends ValKey> = {
  option: OptionType<T>;
  selected: OptionType<T>[];
  onChange(value: OptionType<T>[]): void;
};

function SelectedOption<T extends ValKey>({
  selected,
  onChange,
  option,
}: SelectedProps<T>) {
  const handleRemove = (value: T) =>
    onChange(selected.filter((s) => s.value !== value));

  return (
    <div className="flex items-center px-3 gap-2 h-10 bg-blue-l4 dark:bg-blue-d4 border border-gray-l4 rounded font-semibold text-navy-l1 dark:text-navy-l2 uppercase">
      <span className="max-w-[200px] truncate">{option.label}</span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleRemove(option.value);
        }}
      >
        <Icon type="Close" size={20} />
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
