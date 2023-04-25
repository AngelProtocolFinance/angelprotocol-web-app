import { PropsWithChildren } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Classes } from "./types";
import { unpack } from "./helpers";

export function Radio<T extends FieldValues, K extends Path<T>>({
  children,
  classes,
  disabled,
  name,
  required,
  value,
}: PropsWithChildren<{
  name: K;
  classes?: Classes;
  disabled?: boolean;
  required?: boolean;
  value: T[K];
}>) {
  const { control } = useFormContext<T>();

  const id = `__${name}`;
  const { container, input, lbl } = unpack(classes);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value: controlValue, onChange },
        formState: { isSubmitting },
      }) => (
        <div className={`flex items-center gap-4 ${container}`}>
          <input
            id={id}
            type="radio"
            className={input}
            disabled={isSubmitting || disabled}
            checked={controlValue === value}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {!!children && (
            <label data-required={required} className={lbl} htmlFor={id}>
              {children}
            </label>
          )}
        </div>
      )}
    />
  );
}
