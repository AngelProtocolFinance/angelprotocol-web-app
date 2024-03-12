import { Listbox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { DrawerIcon } from "components/Icon";
import { FieldValues, Path, get, useController } from "react-hook-form";
import { OptionType, ValKey } from "types/components";
import { unpack } from "../form/helpers";
import FocusableInput from "./FocusableInput";
import { styles, valueKey } from "./constants";
import { Props } from "./types";

export function Selector<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
>({
  name,
  disabled,
  options,
  children,
  classes,
  onOptionChange,
}: Props<T, K, V>) {
  const cls = unpack(classes);
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange, ref },
  } = useController<{ [index: string]: OptionType<V> }>({ name });

  const valuePath = `${name}.${valueKey}`;

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
        className={`relative ${cls.container}`}
      >
        <FocusableInput ref={ref} />
        <Listbox.Button
          aria-invalid={!!get(errors, valuePath)?.message}
          aria-disabled={isDisabled}
          as="button"
          className={`${cls.button} ${styles.selectorButton} peer-focus:shadow peer-focus:shadow-red`}
        >
          {({ open }) => (
            <>
              <span>{selected.label}</span>
              <DrawerIcon
                isOpen={open}
                size={25}
                className="justify-self-end dark:text-navy-l2 shrink-0"
              />
            </>
          )}
        </Listbox.Button>
        <Listbox.Options className={`${styles.options} ${cls.options}`}>
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
          name={valuePath}
          errors={errors}
          as="p"
          className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
        />
      </Listbox>
      {children && children(selected)}
    </>
  );
}
