import { ErrorMessage } from "@hookform/error-message";
import { createElement } from "react";
import { useFormContext } from "react-hook-form";
import { FieldValues, Path } from "react-hook-form";
import { Classes } from "./types";
import { Label } from ".";
import { unpack } from "./helpers";

const textarea = "textarea" as const;
type TextArea = typeof textarea;
type InputType = HTMLInputElement["type"] | TextArea;

export type FieldProps<T extends FieldValues, K extends InputType> = Omit<
  K extends TextArea
    ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
    : React.InputHTMLAttributes<HTMLInputElement>,
  "autoComplete" | "className" | "name" | "id" | "spellCheck" | "type"
> & {
  name: Path<T>;
  classes?: Classes | string;
  label: string;
  type?: K;
};

export function Field<T extends FieldValues, K extends InputType = "text">({
  type = "text" as K,
  label,
  name,
  classes,
  required,
  disabled,
  ...props
}: FieldProps<T, K>) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const { container, input, lbl, error } = unpack(classes);

  const id = "__" + String(name);
  return (
    <div className={container + " field"}>
      <Label className={lbl} required={required} htmlFor={id}>
        {label}
      </Label>

      {createElement(type === textarea ? textarea : "input", {
        ...props,
        ...register(name, { valueAsNumber: type === "number" }),
        ...(type === textarea ? {} : { type }),
        disabled: isSubmitting || disabled,
        className: input,
        autoComplete: "off",
        spellCheck: false,
      })}

      <ErrorMessage
        data-error
        errors={errors}
        name={name}
        as="span"
        className={error}
      />
    </div>
  );
}
