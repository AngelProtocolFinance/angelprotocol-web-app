import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { PropsWithChildren, useState } from "react";
import {
  FieldValues,
  Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import { MultiselectorProps, OptionType, ValKey } from "./types";
import Icon, { DrawerIcon } from "components/Icon";
import FocusableInput from "./FocusableInput";
import { styles, valueKey } from "./constants";

export function MultiSelector<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
>({ name, disabled, options, children, classes }: MultiselectorProps<T, K, V>) {
  const { container = "", button = "" } = classes || {};

  ///// ***HOOK FORM*** /////
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange, ref },
  } = useController<{ [index: string]: OptionType<V>[] }>({ name: name });
  const { resetField } = useFormContext<T>();

  /// **SEARCH** ///
  const [searchText] = useState("");
  const filteredOptions = options.filter((o) =>
    searchText ? o.label.toLowerCase().includes(searchText.toLowerCase()) : true
  );
  const optionsAvailable = searchText ? filteredOptions.length >= 1 : true;

  const isAllSelected = selected.length === options.length;
  const isDisabled = isSubmitting || disabled;

  return (
    <>
      <Combobox
        disabled={isDisabled}
        value={selected}
        by={valueKey}
        onChange={(val) => onChange(val)}
        as="div"
        className={`relative ${container}`}
        multiple
      >
        <FocusableInput ref={ref} />
        <Combobox.Button
          aria-invalid={!!get(errors, name)?.message}
          aria-disabled={isDisabled}
          as="div"
          className={`${button} ${styles.selectorButton} p-1`}
        >
          {({ open }) => (
            <>
              <span className="flex flex-wrap gap-2 h-full">
                {selected.map((opt) => (
                  <SelectedOption
                    key={opt.value}
                    option={opt}
                    selected={selected}
                    onChange={onChange}
                  />
                ))}
              </span>
              <DrawerIcon
                isOpen={open}
                size={25}
                className="justify-self-end dark:text-gray shrink-0"
              />
            </>
          )}
        </Combobox.Button>
        <Combobox.Options className={styles.options}>
          {optionsAvailable && (
            <div className="flex justify-between p-4">
              {isAllSelected ? (
                <Action onClick={() => onChange([])}>Deselect All</Action>
              ) : (
                <Action onClick={() => onChange(options)}>Select All</Action>
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
            <p className="text-gray-d1 dark:text-gray text-sm px-4 py-2">
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

type SelectedProps<T> = {
  option: OptionType<T>;
  selected: OptionType<T>[];
  onChange(value: OptionType<T>[]): void;
};

function SelectedOption<T>({ selected, onChange, option }: SelectedProps<T>) {
  const handleRemove = (value: T) =>
    onChange(selected.filter((s) => s.value !== value));

  return (
    <div className="flex items-center px-3 gap-2 h-10 bg-blue-l4 dark:bg-blue-d4 border border-prim rounded font-semibold text-gray-d1 dark:text-gray uppercase">
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
      className="cursor-pointer text-blue hover:text-orange hover:underline"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
