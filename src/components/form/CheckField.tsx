import { unpack } from "helpers";
import { fixedForwardRef } from "helpers/react";
import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import {
  type FieldValues,
  type Path,
  get,
  useFormContext,
} from "react-hook-form";
import type { Classes } from "./types";

type Props<T extends FieldValues> = PropsWithChildren<{
  name: Path<T>;
  classes?: Classes;
  disabled?: boolean;
  required?: boolean;
  onChange?: (val: boolean) => void;
}>;

type NativeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id" | "type"
> & {
  children?: ReactNode;
  classes?: Classes;
  error?: string;
};

function _CheckField(props: NativeProps, ref: ForwardedRef<HTMLInputElement>) {
  const { classes, error, children, required, ...restProps } = props;
  const id = `__${props.name}`;
  const style = unpack(classes);

  return (
    <div className={`check-field ${style.container}`}>
      <input
        ref={ref}
        className={style.input + " peer"}
        type="checkbox"
        id={id}
        aria-disabled={props.disabled}
        aria-invalid={!!error}
        {...restProps}
      />
      {!!children && (
        <label data-required={required} className={style.label} htmlFor={id}>
          {children}
        </label>
      )}

      <p data-error className={style.error + " empty:hidden"}>
        {error}
      </p>
    </div>
  );
}

export const NativeCheckField = fixedForwardRef(_CheckField);

export function CheckField<T extends FieldValues>({
  name,
  onChange,
  disabled,
  ...props
}: Props<T>) {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext<T>();

  return (
    <NativeCheckField
      {...register(name, {
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          onChange?.(event.target.checked),
      })}
      {...props}
      disabled={isSubmitting || disabled}
      error={get(errors, name)?.message}
    />
  );
}
