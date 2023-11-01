import { ReactNode } from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";

export type ValKey = string | number;

export type OptionType<V> = { label: string; value: V };

type Classes = {
  container?: string;
  button?: string;
};

type BaseProps = {
  placeholder?: string;
  disabled?: true;
  classes?: Classes;
};

export interface Props<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
> extends BaseProps {
  name: PathValue<T, K> extends OptionType<V> ? K : never;
  placeholder?: string;
  options: OptionType<V>[];
  disabled?: true;
  classes?: Classes;
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
