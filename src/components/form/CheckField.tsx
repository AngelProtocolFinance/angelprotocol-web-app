import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { FieldValues, Path, get, useFormContext } from "react-hook-form";
import { unpack } from "./helpers";
import { Classes } from "./types";

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "type"
> & {
  classes?: Classes;
  children?: ReactNode;
  error?: string;
};

const NativeCheckField = forwardRef<HTMLInputElement, Props>(
  ({ classes, required, children, error, ...props }, ref) => {
    const { container, input: int, lbl, error: errClass } = unpack(classes);
    const id = `__${props.name}`;

    return (
      <div className={`check-field ${container}`}>
        <input
          {...props}
          ref={ref}
          className={int + " peer"}
          type="checkbox"
          id={id}
          aria-disabled={props.disabled}
          aria-invalid={!!error}
        />
        {children && (
          <label data-required={required} className={lbl} htmlFor={id}>
            {children}
          </label>
        )}

        {error && (
          <p data-error className={errClass}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

export function CheckField<T extends FieldValues>({
  name,
  disabled,
  ...props
}: Omit<Props, "name"> & {
  name: Path<T>;
}) {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext<T>();

  return (
    <NativeCheckField
      {...register(name)}
      {...props}
      disabled={disabled || isSubmitting}
      error={get(errors, name)?.message}
    />
  );
}
