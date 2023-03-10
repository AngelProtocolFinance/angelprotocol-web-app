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
  tooltip?: string;
  label: string;
  type?: K;
};

export function Field<T extends FieldValues, K extends InputType = "text">({
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
        id,
        disabled: isSubmitting || disabled,
        className: input,
        autoComplete: "off",
        spellCheck: false,
      })}

      {(tooltip && ( //tooltip in normal flow
        <p className={error + " text-left mt-2 left-0 text-xs"}>
          <span className="text-gray-d1 dark:text-gray">{tooltip}</span>{" "}
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
          className={error}
        />
      )}
    </div>
  );
}
