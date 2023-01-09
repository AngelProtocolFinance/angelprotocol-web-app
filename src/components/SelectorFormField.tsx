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

type VarOption<M extends boolean, V extends ValKey> = M extends true
  ? OptionType<V>[]
  : OptionType<V>;

interface Props<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
  M extends boolean
> {
  name: T[K] extends VarOption<M, V> ? K : never;
  multiple?: M;
  placeholder?: string;
  options: OptionType<V>[];
  disabled?: true;
  classes?: Classes;
  children?: (selected: VarOption<M, V>) => ReactNode;
}

const labelKey: keyof OptionType<string> = "label";

export function SelectorFormField<
  T extends FieldValues,
  K extends Path<T>,
  ValueType extends ValKey,
  Multiple extends boolean
>({
  name,
  disabled,
  options,
  children,
  classes,
  multiple,
}: Props<T, K, ValueType, Multiple>) {
  const { container = "", button = "" } = classes || {};
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange: onSelectedChange },
  } = useController<{ [index: string]: VarOption<Multiple, ValueType> }>({
    name: name as any,
  });

  const labelId = `${name}.${labelKey}`;

  return (
    <>
      <Selector
        disabled={isSubmitting || disabled}
        onChange={onSelectedChange}
        classes={{ container: container, button: button }}
        multiple={multiple}
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
