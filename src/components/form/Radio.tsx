import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { unpack } from "./helpers";
import { Classes } from "./types";

type Props<T extends FieldValues, K extends Path<T>> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "className" | "value"
> & {
  children?: ReactNode;
  classes?: Classes;
  value: PathValue<T, K> extends string ? PathValue<T, K> : never;
};

export function _Radio<T extends FieldValues, K extends Path<T>>(
  { children, classes, ...rest }: Props<T, K>,
  ref: any
) {
  const id = `__${rest.name}-${rest.value}`;
  const { container, input } = unpack(classes);

  return (
    <label className={`radio ${container}`} htmlFor={id}>
      <input
        {...rest}
        ref={ref}
        id={id}
        type="radio"
        className={`peer ${input}`}
        disabled={rest.disabled}
      />
      {children || rest.value}
    </label>
  );
}

export const NativeRadio = forwardRef(_Radio) as typeof _Radio;

export function Radio<T extends FieldValues, K extends Path<T>>({
  name,
  disabled,
  ...rest
}: Omit<Props<T, K>, "name"> & { name?: Path<T> }) {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<T>();

  return (
    <NativeRadio
      disabled={isSubmitting || disabled}
      {...register(name as any)}
      {...rest}
    />
  );
}
