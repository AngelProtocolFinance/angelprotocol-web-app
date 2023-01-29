import { ErrorMessage } from "@hookform/error-message";
import { PropsWithChildren } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Classes } from "./types";
import { unpack } from "./helpers";

export function Checkbox<T extends FieldValues>({
  name,
  children,
  classes,
  disabled,
  required,
}: PropsWithChildren<{
  name: Path<T>;
  classes?: Classes;
  disabled?: true;
  required?: boolean;
}>) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<T>();

  const id = `__${name}` as Path<T>;
  const { container, input: int, lbl, error } = unpack(classes);

  return (
    <div className={`check-field ${container}`}>
      <input
        className={int + " peer"}
        type="checkbox"
        {...register(name)}
        id={id}
        disabled={isSubmitting || disabled}
      />
      <label data-required={required} className={lbl} htmlFor={id}>
        {children}
      </label>

      <ErrorMessage
        errors={errors}
        name={name as any}
        as="p"
        className={error}
      />
    </div>
  );
}
