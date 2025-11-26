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
import {
  type ForwardedRef,
  type ReactNode,
  useImperativeHandle,
  useRef,
} from "react";
import type { BaseProps } from "./types";

export interface Props<T extends string> extends BaseProps {
  value: T;
  onChange: (opt: T) => void;
  options: T[];
  option_disp: (opt: T) => ReactNode;
  children?: (selected: T) => ReactNode;
  error?: string;
  label?: ReactNode;
  required?: boolean;
}

function _Select<T extends string>(
  props: Props<T>,
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
      <Label
        data-required={props.required}
        className={`label empty:hidden mb-2 ${cls.label}`}
      >
        {props.label}
      </Label>
      <Listbox
        disabled={props.disabled}
        value={props.value}
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
              <span>{props.option_disp(props.value)}</span>
              <DrawerIcon
                is_open={open}
                size={20}
                className="justify-self-end dark:text-gray shrink-0"
              />
            </>
          )}
        </ListboxButton>
        <ListboxOptions className={`selector-opts ${cls.options} scroller`}>
          {props.options.map((v) => (
            <ListboxOption
              key={v}
              value={v}
              className={`selector-opt ${cls.option}`}
            >
              {props.option_disp(v)}
            </ListboxOption>
          ))}
        </ListboxOptions>
        <p className="field-err mt-1 empty:hidden">{props.error}</p>
      </Listbox>
      {props.children?.(props.value)}
    </Field>
  );
}

export const Select = fixedForwardRef(_Select);
