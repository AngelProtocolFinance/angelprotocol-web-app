import { fixedForwardRef } from "helpers/react";
import { unpack } from "helpers/unpack";
import type { ForwardedRef, InputHTMLAttributes, ReactNode } from "react";
import type { Classes } from "./types";

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

export const CheckField = fixedForwardRef(_CheckField);
