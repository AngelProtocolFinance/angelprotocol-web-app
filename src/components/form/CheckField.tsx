import { ErrorMessage } from "@hookform/error-message";
import { PropsWithChildren } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Classes } from "./types";
import { unpack } from "./helpers";

export function CheckField<T extends FieldValues>({
  name,
  children,
  classes,
  disabled,
  required,
}: PropsWithChildren<{
  name: Path<T>;
  classes?: Classes;
  disabled?: boolean;
  required?: boolean;
}>) {
  const { control } = useFormContext<T>();

  const id = `__${name}`;
  const { container, input: int, lbl, error } = unpack(classes);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange },
        formState: { isSubmitting, errors },
      }) => (
        <div className={`check-field ${container}`}>
          <input
            className={int + " peer"}
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked as any)}
            id={id}
            disabled={isSubmitting || disabled}
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
      )}
    />
  );
}
