import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import Selector from "./Selector";

type ValKey = string | number;

export type OptionType<V> = { label: string; value: V };
type Classes = {
  container?: string;
  button?: string;
};

type Props<T extends FieldValues, K extends Path<T>, V extends ValKey> = {
  placeholder?: string;
  disabled?: true;
  options: OptionType<V>[];
  classes?: Classes;
} & (
  | {
      multiple: true;
      name: T[K] extends OptionType<V>[] ? K : never;
      children?: (selected: OptionType<V>[]) => ReactNode;
    }
  | {
      multiple?: false;
      name: T[K] extends OptionType<V> ? K : never;
      children?: (selected: OptionType<V>) => ReactNode;
    }
);

const labelKey: keyof OptionType<string> = "label";

export function SelectorFormField<
  T extends FieldValues,
  K extends Path<T>,
  ValueType extends ValKey
>({
  name,
  disabled,
  options,
  children,
  classes,
  multiple,
}: Props<T, K, ValueType>) {
  const { container = "", button = "" } = classes || {};
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange: onSelectedChange },
  } = useController<{
    [index: string]: OptionType<ValueType> | OptionType<ValueType>[];
  }>({ name });

  const labelId = `${name}.${labelKey}`;

  if (multiple) {
    return (
      <>
        <Selector<ValueType>
          disabled={isSubmitting || disabled}
          onChange={onSelectedChange}
          classes={{ container: container, button: button }}
          multiple
          options={options}
          selectedOptions={selected as OptionType<ValueType>[]}
        >
          <ErrorMessage
            name={name}
            errors={errors}
            as="p"
            className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
          />
        </Selector>
        {children && children(selected as OptionType<ValueType>[])}
      </>
    );
  }

  return (
    <>
      <Selector<ValueType>
        disabled={isSubmitting || disabled}
        onChange={onSelectedChange}
        classes={{ container: container, button: button }}
        options={options}
        selectedOptions={selected as OptionType<ValueType>}
      >
        <ErrorMessage
          name={labelId}
          errors={errors}
          as="p"
          className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
        />
      </Selector>
      {children && children(selected as OptionType<ValueType>)}
    </>
  );
}
