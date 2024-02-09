import { InputHTMLAttributes, ReactNode } from "react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { unpack } from "./helpers";
import { Classes } from "./types";

type Common<T extends FieldValues, K extends Path<T>> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "className" | "value"
> & {
  children?: ReactNode;
  classes?: Classes;
  value: PathValue<T, K> extends string ? PathValue<T, K> : never;
};

export function Radio<T extends FieldValues, K extends Path<T>>({
  name,
  disabled,
  ...rest
}: Common<T, K> & { name?: Path<T> }) {
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

export function NativeRadio<T extends FieldValues, K extends Path<T>>({
  children,
  classes,
  ...rest
}: Common<T, K>) {
  const id = `__${rest.name}-${rest.value}`;
  const { container, input } = unpack(classes);

  return (
    <label className={`radio ${container}`} htmlFor={id}>
      <input
        {...rest}
        id={id}
        type="radio"
        className={`peer ${input}`}
        disabled={rest.disabled}
      />
      {children || rest.value}
    </label>
  );
}
