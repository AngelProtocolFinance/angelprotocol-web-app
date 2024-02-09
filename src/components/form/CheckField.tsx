import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { FieldValues, Path, get, useFormContext } from "react-hook-form";
import { unpack } from "./helpers";
import { Classes } from "./types";

type Custom = {
  classes?: Classes;
  children?: ReactNode;
  error?: string;
};

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> &
  Custom;

function _CheckField(
  { classes, required, children, error, ...props }: Props,
  ref: any
) {
  const { container, input: int, lbl, error: errClass } = unpack(classes);
  const name = props.name;
  const id = `__${name}`;

  return (
    <div className={`check-field ${container}`}>
      <input
        {...props}
        ref={ref}
        className={int + " peer"}
        type="checkbox"
        id={id}
        disabled={props.disabled}
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

export const NativeCheckField = forwardRef(_CheckField) as typeof _CheckField;
export function CheckField<T extends FieldValues>({
  name,
  ...rest
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
      {...rest}
      disabled={rest.disabled || isSubmitting}
      error={get(errors, name)?.message}
    />
  );
}
