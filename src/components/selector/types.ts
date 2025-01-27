import type { ReactNode } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import type { OptionType, ValKey } from "types/components";

export type Classes = {
  container?: string;
  button?: string;
  options?: string;
};

type BaseProps = {
  placeholder?: string;
  disabled?: boolean;
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
  classes?: Classes;
  onOptionChange?(): void;
  children?: (selected: OptionType<V>) => ReactNode;
}

export interface ControlledProps<T extends ValKey> extends BaseProps {
  value: OptionType<T>;
  onChange: (opt: OptionType<T>) => void;
  options: OptionType<T>[];
  children?: (selected: OptionType<T>) => ReactNode;
  error?: string;
}

export interface ControlledMultiSelectorProps<T extends ValKey>
  extends BaseProps {
  value: OptionType<T>[];
  onChange: (opts: OptionType<T>[]) => void;
  onReset: () => void;
  error?: string;

  options: OptionType<T>[];
  children?: (selected: OptionType<T>[]) => ReactNode;
  searchable?: true;
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
