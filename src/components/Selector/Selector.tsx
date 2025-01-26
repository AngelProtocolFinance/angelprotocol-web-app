import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import { unpack } from "helpers";
import { fixedForwardRef } from "helpers/react";
import type { ForwardedRef } from "react";
import {
  type FieldValues,
  type Path,
  get,
  useController,
} from "react-hook-form";
import type { OptionType, ValKey } from "types/components";
import FocusableInput from "./FocusableInput";
import { styles, valueKey } from "./constants";
import type { ControlledProps, Props } from "./types";

function _List<T extends ValKey>(
  props: ControlledProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const cls = unpack(props.classes);

  return (
    <>
      <Listbox
        disabled={props.disabled}
        value={props.value}
        by={valueKey}
        onChange={props.onChange}
        as="div"
        className={`relative ${cls.container}`}
      >
        <FocusableInput ref={ref} />
        <ListboxButton
          aria-invalid={!!props.error}
          aria-disabled={props.disabled}
          as="button"
          className={`${cls.button} ${styles.selectorButton} peer-focus:shadow-sm peer-focus:shadow-red`}
        >
          {({ open }) => (
            <>
              <span>{props.value.label}</span>
              <DrawerIcon
                isOpen={open}
                size={20}
                className="justify-self-end dark:text-navy-l2 shrink-0"
              />
            </>
          )}
        </ListboxButton>
        <ListboxOptions className={`${styles.options} ${cls.options}`}>
          {props.options
            .filter((o) => !!o.value)
            .map((o) => (
              <ListboxOption key={o.value} value={o} className={styles.option}>
                {o.label}
              </ListboxOption>
            ))}
        </ListboxOptions>
        <p className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2 empty:hidden">
          {props.error}
        </p>
      </Listbox>
      {props.children?.(props.value)}
    </>
  );
}

export const List = fixedForwardRef(_List);

export function Selector<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
>(props: Props<T, K, V>) {
  const { name, disabled, onOptionChange, ...rest } = props;
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange, ref },
  } = useController<{ [index: string]: OptionType<V> }>({ name });

  const valuePath = `${name}.${valueKey}`;

  const isDisabled = isSubmitting || disabled;

  return (
    <List<V>
      ref={ref}
      value={selected}
      onChange={(opt) => {
        onChange(opt);
        onOptionChange?.();
      }}
      disabled={isDisabled}
      error={get(errors, valuePath)?.message}
      {...rest}
    />
  );
}
