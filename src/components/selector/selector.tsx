import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { DrawerIcon } from "components/icon";
import { fixedForwardRef } from "helpers/react";
import { unpack } from "helpers/unpack";
import { type ForwardedRef, useImperativeHandle, useRef } from "react";
import {
  type FieldValues,
  type Path,
  get,
  useController,
} from "react-hook-form";
import type { OptionType, ValKey } from "types/components";
import { valueKey } from "./constants";
import type { ControlledProps, Props } from "./types";

function _List<T extends ValKey>(
  props: ControlledProps<T>,
  ref: ForwardedRef<Pick<HTMLButtonElement, "focus" | "scrollTo">>
) {
  const cls = unpack(props.classes);

  const btnRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => ({
    focus: () => btnRef.current?.focus(),
    scrollTo: () => btnRef.current?.scrollIntoView({ block: "nearest" }),
  }));

  return (
    <Field className={cls.container}>
      <Label data-required={props.required} className="label empty:hidden mb-2">
        {props.label}
      </Label>
      <Listbox
        disabled={props.disabled}
        value={props.value}
        by={valueKey}
        onChange={props.onChange}
        as="div"
        className="relative"
      >
        <ListboxButton
          ref={btnRef}
          aria-invalid={!!props.error}
          aria-disabled={props.disabled}
          as="button"
          className={`${cls.button} selector-btn field-input focus:outline-2 data-open:outline-2 outline-blue-d1`}
        >
          {({ open }) => (
            <>
              <span>{props.value.label}</span>
              <DrawerIcon
                isOpen={open}
                size={20}
                className="justify-self-end dark:text-gray shrink-0"
              />
            </>
          )}
        </ListboxButton>
        <ListboxOptions className={`selector-opts ${cls.options} scroller`}>
          {props.options
            .filter((o) => !!o.value)
            .map((o) => (
              <ListboxOption
                key={o.value}
                value={o}
                className={`selector-opt ${cls.option}`}
              >
                {o.label}
              </ListboxOption>
            ))}
        </ListboxOptions>
        <p className="field-err mt-1 empty:hidden">{props.error}</p>
      </Listbox>
      {props.children?.(props.value)}
    </Field>
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
