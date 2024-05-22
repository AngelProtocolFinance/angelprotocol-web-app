import type { PropsWithChildren } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  useFormContext,
} from "react-hook-form";
import { unpack } from "helpers";
import type { Classes } from "./types";

type Props<T extends FieldValues, K extends Path<T>> = PropsWithChildren<{
  name: K;
  value: PathValue<T, K> extends string ? PathValue<T, K> : never;
  classes?: Classes;
  disabled?: boolean;
}>;

export function Radio<T extends FieldValues, K extends Path<T>>({
  children,
  classes,
  name,
  value,
  disabled,
}: Props<T, K>) {
  const id = `__${name}-${value}`;
  const { container, input } = unpack(classes);
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<T>();

  return (
    <label className={`radio ${container}`} htmlFor={id}>
      <input
        {...register(name)}
        id={id}
        type="radio"
        className={`peer ${input}`}
        disabled={isSubmitting || disabled}
        value={value}
      />
      {children || value}
    </label>
  );
}
