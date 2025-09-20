import type React from "react";
import { type ForwardedRef, forwardRef } from "react";

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "autoComplete" | "className" | "id" | "spellCheck" | "type"
> & {
  error?: string;
  classes?: string;
};

function X(
  { required, error, classes = "", ...props }: Props & { error?: string },
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = `__${props.name}`;

  return (
    <td className={classes + " has-focus:bg-amber-l5 relative"}>
      <input
        ref={ref}
        {...props}
        id={id}
        autoComplete="off"
        spellCheck={false}
        className="focus:outline-none p-2 text-sm placeholder:text-gray-l1"
      />
      <p className="empty:hidden text-2xs text-red right-0 absolute -bottom-1.5">
        {error}
      </p>
    </td>
  );
}

export const FieldCell = forwardRef(X) as typeof X;
