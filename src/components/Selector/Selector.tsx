import { Listbox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldValues, get, useController } from "react-hook-form";
import { Props } from "./types";
import { OptionType, ValKey } from "types/utils";
import { DrawerIcon } from "components/Icon";
import FocusableInput from "./FocusableInput";
import { styles, valueKey } from "./constants";

export function Selector<T extends FieldValues, V extends ValKey>({
  name,
  rules,
  disabled,
  options,
  children,
  classes,
  onOptionChange,
}: Props<T, V>) {
  const { container = "", button = "" } = classes || {};
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange, ref },
  } = useController<T>({ name, rules });

  const isDisabled = isSubmitting || disabled;
  return (
    <>
      <Listbox
        disabled={isDisabled}
        value={selected}
        by={valueKey}
        onChange={(option: OptionType<V>) => {
          onOptionChange?.();
          onChange(option);
        }}
        as="div"
        className={`relative ${container}`}
      >
        <FocusableInput ref={ref} />
        <Listbox.Button
          aria-invalid={!!get(errors, name)?.message}
          aria-disabled={isDisabled}
          as="button"
          className={`${button} ${styles.selectorButton}`}
        >
          {({ open }) => (
            <>
              <span>{selected.label}</span>
              <DrawerIcon
                isOpen={open}
                size={25}
                className="justify-self-end dark:text-gray shrink-0"
              />
            </>
          )}
        </Listbox.Button>
        <Listbox.Options className={styles.options}>
          {options
            .filter((o) => !!o.value)
            .map((o) => (
              <Listbox.Option
                key={o.value}
                value={o}
                className={({ active, selected }) =>
                  styles.option(selected, active)
                }
              >
                {o.label}
              </Listbox.Option>
            ))}
        </Listbox.Options>
        <ErrorMessage
          name={name as any}
          errors={errors}
          as="p"
          className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
        />
      </Listbox>
      {children && children(selected)}
    </>
  );
}
