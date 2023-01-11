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

type VarOption<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey
> = T[K] extends OptionType<V>
  ? OptionType<V>
  : T[K] extends OptionType<V>[]
  ? OptionType<V>[]
  : never;

type Props<T extends FieldValues, K extends Path<T>, V extends ValKey> = {
  placeholder?: string;
  disabled?: true;
  options: OptionType<V>[];
  classes?: Classes;
} & (
  | {
      multiple?: true;
      name: T[K] extends OptionType<V>[] ? K : never;
      children?: (selected: OptionType<V>[]) => ReactNode;
    }
  | {
      multiple: false;
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
  } = useController<{ [index: string]: VarOption<T, K, ValueType> }>({
    name: name as any,
  });

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
          selectedOptions={selected}
        >
          <ErrorMessage
            /**single value, could just validate option.label. multiple on the other hand, should validate option[]*/
            name={(multiple ? name : labelId) as any}
            errors={errors}
            as="p"
            className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
          />
        </Selector>
        {children && children(selected as any)}
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
        selectedOptions={selected}
      >
        <ErrorMessage
          /**single value, could just validate option.label. multiple on the other hand, should validate option[]*/
          name={(multiple ? name : labelId) as any}
          errors={errors}
          as="p"
          className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
        />
      </Selector>
      {children && children(selected as any)}
    </>
  );
}
