import { ErrorMessage } from "@hookform/error-message";
import { unpack } from "helpers";
import type { ChangeEvent, PropsWithChildren } from "react";
import {
  type FieldValues,
  type Path,
  get,
  useFormContext,
} from "react-hook-form";
import type { Classes } from "./types";

export function CheckField<T extends FieldValues>({
  name,
  children,
  classes,
  disabled,
  required,
  onChange,
}: PropsWithChildren<{
  name: Path<T>;
  classes?: Classes;
  disabled?: boolean;
  required?: boolean;
  onChange?: (val: boolean) => void;
}>) {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext<T>();

  const id = `__${name}`;
  const { container, input: int, label: lbl, error } = unpack(classes);

  const invalid = !!get(errors, name);

  return (
    <div className={`check-field ${container}`}>
      <input
        {...register(name, {
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            onChange?.(event.target.checked),
        })}
        className={int + " peer"}
        type="checkbox"
        id={id}
        disabled={isSubmitting || disabled}
        aria-disabled={isSubmitting || disabled}
        aria-invalid={invalid}
      />
      {!!children && (
        <label data-required={required} className={lbl} htmlFor={id}>
          {children}
        </label>
      )}

      <ErrorMessage
        data-error
        errors={errors}
        name={name as any}
        as="p"
        className={error}
      />
    </div>
  );
}
