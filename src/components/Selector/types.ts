import { ReactNode } from "react";
import { FieldValues, Path, PathValue, RegisterOptions } from "react-hook-form";
import { OptionType, ValKey } from "types/utils";

type Classes = {
  container?: string;
  button?: string;
};

type BaseProps = {
  placeholder?: string;
  disabled?: true;
  classes?: Classes;
};

export interface Props<T extends FieldValues, V extends ValKey>
  extends BaseProps {
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  placeholder?: string;
  options: OptionType<V>[];
  disabled?: true;
  classes?: Classes;
  onOptionChange?(): void;
  children?: (selected: OptionType<V>) => ReactNode;
}

export interface MultiselectorProps<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
> extends BaseProps {
  name: PathValue<T, K> extends OptionType<V>[] ? K : never;
  options: OptionType<V>[];
  children?: (selected: OptionType<V>[]) => ReactNode;
  searchable?: true;
}
