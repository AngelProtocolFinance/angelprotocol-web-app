import { HTMLInputTypeAttribute, createElement, forwardRef } from "react";
import { FieldValues, Path, get, useFormContext } from "react-hook-form";
import { Label } from ".";
import { unpack } from "./helpers";
import { Classes } from "./types";

const textarea = "textarea" as const;
type TextArea = typeof textarea;
type InputType = HTMLInputTypeAttribute | TextArea;

type Props<T extends InputType> = Omit<
  T extends TextArea
    ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
    : React.InputHTMLAttributes<HTMLInputElement>,
  "autoComplete" | "className" | "spellCheck" | "type"
> & { type?: T; classes?: Classes | string; tooltip?: string; label: string };

function _Field<T extends InputType = InputType>(
  {
    type = "text" as T,
    label,
    classes,
    tooltip,
    error,
    required, //extract from props to disable native validation
    ...props
  }: Props<T> & { error?: string },
  ref: any
) {
  const { container, input, lbl, error: errClass } = unpack(classes);

  const id = "__" + props.name;

  return (
    <div className={container + " field"} aria-required={required}>
      <Label className={lbl} required={required} htmlFor={id}>
        {label}
      </Label>

      {createElement(type === textarea ? textarea : "input", {
        ...props,
        ...(type === textarea ? {} : { type }),
        ref,
        id,
        "aria-invalid": !!error,
        "aria-disabled": props.disabled,
        className: `${input}`,
        autoComplete: "off",
        spellCheck: false,
      })}

      {(tooltip && ( //tooltip in normal flow
        <p className={errClass + " text-left mt-2 left-0 text-xs"}>
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

export const NativeField = forwardRef(_Field) as typeof _Field;

export function Field<T extends FieldValues, K extends InputType = InputType>({
  name,
  disabled,
  type,
  ...rest
}: Omit<Props<K>, "name"> & { name: Path<T> }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <NativeField
      {...register(name, { valueAsNumber: type === "number" })}
      {...rest} //native properties override that from register
      disabled={disabled || isSubmitting}
      error={get(errors, name)?.message}
    />
  );
}
