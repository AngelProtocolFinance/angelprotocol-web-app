import { ReactNode } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import { OptionType, ValKey } from "types/components";

type Classes = {
  container?: string;
  button?: string;
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
  rules?: UseControllerProps<
    {
      [index: string]: OptionType<V>;
    },
    string
  >["rules"];
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
