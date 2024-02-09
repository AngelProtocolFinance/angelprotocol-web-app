import { PropsWithChildren } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegisterReturn,
  useFormContext,
} from "react-hook-form";
import { unpack } from "./helpers";
import { Classes } from "./types";

type Common<T extends FieldValues, K extends Path<T>> = PropsWithChildren<{
  disabled?: boolean;
  classes?: Classes;
  value: PathValue<T, K> extends string ? PathValue<T, K> : never;
}>;

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
      registerReturn={register(name as any)}
      disabled={isSubmitting || disabled}
      {...rest}
    />
  );
}

export function NativeRadio<T extends FieldValues, K extends Path<T>>({
  children,
  classes,
  value,
  disabled,
  registerReturn,
}: Common<T, K> & { registerReturn: UseFormRegisterReturn }) {
  const id = `__${registerReturn.name}-${value}`;
  const { container, input } = unpack(classes);

  return (
    <label className={`radio ${container}`} htmlFor={id}>
      <input
        {...registerReturn}
        id={id}
        type="radio"
        className={`peer ${input}`}
        disabled={disabled}
        value={value}
      />
      {children || value}
    </label>
  );
}
