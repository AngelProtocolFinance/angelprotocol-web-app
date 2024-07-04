import { unpack } from "helpers";
import type React from "react";
import {
  type ForwardedRef,
  type HTMLInputTypeAttribute,
  type ReactElement,
  type ReactNode,
  createElement,
  forwardRef,
} from "react";
import {
  type FieldValues,
  type Path,
  get,
  useFormContext,
} from "react-hook-form";
import { Label } from ".";
import type { Classes } from "./types";

const textarea = "textarea" as const;
type TextArea = typeof textarea;
type InputType = HTMLInputTypeAttribute | TextArea;

type Props<T extends InputType> = Omit<
  T extends TextArea
    ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
    : React.InputHTMLAttributes<HTMLInputElement>,
  "autoComplete" | "className" | "id" | "spellCheck" | "type"
> & {
  classes?: Classes | string;
  tooltip?: ReactNode;
  label: string | ReactElement;
  type?: T;
};

function _Field<T extends InputType = InputType>(
  {
    type = "text" as T,
    label,
    classes,
    tooltip,
    required, //extract from props to disable native validation
    error,
    ...props
  }: Props<T> & { error?: string },
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) {
  const style = unpack(classes);

  const id = "__" + String(props.name);

  return (
    <div className={style.container + " field"}>
      <Label className={style.label} required={required} htmlFor={id}>
        {label}
      </Label>

      {createElement(type === textarea ? textarea : "input", {
        ref,
        ...props,
        ...(type === textarea ? {} : { type }),
        id,
        "aria-invalid": !!error,
        "aria-disabled": props.disabled,
        className: style.input,
        autoComplete: "off",
        spellCheck: false,
      })}

      {(tooltip && ( //tooltip in normal flow
        <p className={style.error + " text-left mt-2 left-0 text-xs"}>
          {typeof tooltip === "string" ? (
            <span className="text-navy-l1 dark:text-navy-l2">{tooltip}</span>
          ) : (
            tooltip
          )}{" "}
          <span className="empty:hidden text-red dark:text-red-l2 text-xs before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 empty:before:hidden empty:after:hidden">
            {error}
          </span>
        </p>
      )) || (
        <span data-error className={style.error + " empty:hidden"}>
          {error}
        </span>
      )}
    </div>
  );
}

export const NativeField = forwardRef(_Field) as typeof _Field;

export function Field<T extends FieldValues, K extends InputType = InputType>({
  name,
  disabled,
  ...rest
}: Omit<Props<K>, "name"> & { name: Path<T> }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <NativeField
      {...register(name)}
      {...rest}
      disabled={disabled || isSubmitting}
      error={get(errors, name)?.message}
    />
  );
}
