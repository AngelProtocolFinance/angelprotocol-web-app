import { HTMLInputTypeAttribute, createElement } from "react";
import {
  FieldValues,
  Path,
  UseFormRegisterReturn,
  get,
  useFormContext,
} from "react-hook-form";
import { Label } from ".";
import { unpack } from "./helpers";
import { Classes } from "./types";

const textarea = "textarea" as const;
type TextArea = typeof textarea;
type InputType = HTMLInputTypeAttribute | TextArea;

type Common<T extends InputType> = Omit<
  T extends TextArea
    ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
    : React.InputHTMLAttributes<HTMLInputElement>,
  "autoComplete" | "className" | "name" | "id" | "spellCheck" | "type"
> & { type?: T; classes?: Classes | string; tooltip?: string; label: string };

export function Field<T extends FieldValues, K extends InputType = InputType>({
  name,
  disabled,
  ...rest
}: Common<K> & { name: Path<T> }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <NativeField
      {...rest}
      {...register(name)}
      error={get(errors, name)}
      disabled={disabled || isSubmitting}
    />
  );
}

export function NativeField<T extends InputType = InputType>({
  type = "text" as T,
  label,
  classes,
  tooltip,
  required,
  disabled,
  error,
  ...props
}: Common<T> & UseFormRegisterReturn & { error?: string }) {
  const { container, input, lbl, error: errClass } = unpack(classes);

  const id = "__" + String(props.name);

  return (
    <div className={container + " field"} aria-required={required}>
      <Label className={lbl} required={required} htmlFor={id}>
        {label}
      </Label>

      {createElement(type === textarea ? textarea : "input", {
        ...props,
        ...(type === textarea ? {} : { type }),
        id,
        "aria-invalid": !error,
        disabled,
        "aria-disabled": disabled,
        className: `${input}`,
        autoComplete: "off",
        spellCheck: false,
      })}

      {(tooltip && ( //tooltip in normal flow
        <p className={error + " text-left mt-2 left-0 text-xs"}>
          <span className="text-gray-d1 dark:text-gray">{tooltip}</span>{" "}
          {error && (
            <span className="text-red dark:text-red-l2 text-xs before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 empty:before:hidden empty:after:hidden">
              {error}
            </span>
          )}
        </p>
      )) ||
        (error && (
          <span data-error className={errClass}>
            {error}
          </span>
        ))}
    </div>
  );
}
