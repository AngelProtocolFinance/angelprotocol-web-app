import { ErrorMessage } from "@hookform/error-message";
import {
  type HTMLInputTypeAttribute,
  type ReactNode,
  createElement,
} from "react";
import {
  type FieldValues,
  type Path,
  get,
  useFormContext,
} from "react-hook-form";
import { Label } from ".";
import { unpack } from "helpers";
import type { Classes } from "./types";

const textarea = "textarea" as const;
type TextArea = typeof textarea;
type InputType = HTMLInputTypeAttribute | TextArea;

type FieldProps<T extends FieldValues, K extends InputType> = Omit<
  K extends TextArea
    ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
    : React.InputHTMLAttributes<HTMLInputElement>,
  "autoComplete" | "className" | "name" | "id" | "spellCheck" | "type"
> & {
  name: Path<T>;
  classes?: Classes | string;
  tooltip?: ReactNode;
  label: string;
  type?: K;
};

export function Field<T extends FieldValues, K extends InputType = InputType>({
  type = "text" as K,
  label,
  name,
  classes,
  tooltip,
  required,
  disabled,
  ...props
}: FieldProps<T, K>) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const style = unpack(classes);

  const id = "__" + String(name);

  return (
    <div className={style.container + " field"} aria-required={required}>
      <Label className={style.label} required={required} htmlFor={id}>
        {label}
      </Label>

      {createElement(type === textarea ? textarea : "input", {
        ...props,
        ...register(name, { valueAsNumber: type === "number" }),
        ...(type === textarea ? {} : { type }),
        id,
        "aria-invalid": !!get(errors, name)?.message,
        disabled: isSubmitting || disabled,
        "aria-disabled": isSubmitting || disabled,
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
          <ErrorMessage
            errors={errors}
            name={name}
            as="span"
            className="text-red dark:text-red-l2 text-xs before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 empty:before:hidden empty:after:hidden"
          />
        </p>
      )) || (
        <ErrorMessage
          data-error
          errors={errors}
          name={name}
          as="span"
          className={style.error}
        />
      )}
    </div>
  );
}
