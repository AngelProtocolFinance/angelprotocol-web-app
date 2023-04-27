import { PropsWithChildren } from "react";
import { Classes } from "./types";
import { unpack } from "./helpers";

type Props<Value extends string> = PropsWithChildren<{
  checked: boolean;
  classes?: Classes;
  disabled?: boolean;
  id?: string;
  required?: boolean;
  value: Value;
  onChange: (value: Value) => void;
}>;

export function Radio<Value extends string>({
  checked,
  children,
  classes,
  disabled,
  required,
  value,
  id = `__radio-btn-${value}`,
  onChange,
}: Props<Value>) {
  const { container, input } = unpack(classes);
  return (
    <label
      data-required={required}
      className={`radio ${container}`}
      htmlFor={id}
    >
      <input
        id={id}
        type="radio"
        className={`peer ${input}`}
        disabled={disabled}
        checked={checked}
        value={value}
        onChange={(e) => onChange(e.target.value as Value)}
        required={required}
      />
      {children}
    </label>
  );
}
