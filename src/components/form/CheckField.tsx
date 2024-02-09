import { ErrorMessage } from "@hookform/error-message";
import { PropsWithChildren } from "react";
import { FormState, UseFormRegisterReturn, get } from "react-hook-form";
import { unpack } from "./helpers";
import { Classes } from "./types";

type Custom = PropsWithChildren<{
  classes?: Classes;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  formState?: FormState<any>;
}>;

type Props = UseFormRegisterReturn & Custom;

export function CheckField({
  classes,
  disabled,
  required,
  children,
  invalid,
  formState,
  ...registerReturn
}: Props) {
  const { container, input: int, lbl, error } = unpack(classes);
  const name = registerReturn.name;
  const id = `__${name}`;

  return (
    <div className={`check-field ${container}`}>
      <input
        {...registerReturn}
        className={int + " peer"}
        type="checkbox"
        id={id}
        disabled={formState?.isSubmitting || disabled}
        aria-disabled={formState?.isSubmitting || disabled}
        aria-invalid={!!get(formState?.errors, name) || invalid}
      />
      {!!children && (
        <label data-required={required} className={lbl} htmlFor={id}>
          {children}
        </label>
      )}

      {formState?.errors && (
        <ErrorMessage
          data-error
          errors={formState.errors}
          name={name as any}
          as="p"
          className={error}
        />
      )}
    </div>
  );
}
