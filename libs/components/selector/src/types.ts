import { ReactNode } from "react";
import { FieldValues, Path } from "react-hook-form";

export type ValKey = string | number;

export type OptionType<V> = { label: string; value: V };
type Classes = {
  container?: string;
  button?: string;
};

export type VarOption<M extends boolean, V extends ValKey> = M extends true
  ? OptionType<V>[]
  : OptionType<V>;

export interface Props<
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
