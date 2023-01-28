import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FieldValues, Path } from "react-hook-form";
import { Classes } from "./types";
import { Label } from "./";

export type TextInputProps<T extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "autoComplete" | "className" | "name" | "id" | "spellCheck"
> & {
  name: Path<T>;
  classes?: Classes | string;
  label: string;
};

export function TextInput<T extends FieldValues>({
  type = "text",
  label,
  name,
  classes,
  required,
  disabled,
  ...props
}: TextInputProps<T>) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const { container, input, lbl, error } = format(classes);

  const id = "__" + String(name);
  return (
    <div className={container + " field-group"}>
      <Label className={lbl} required={required} htmlFor={id}>
        {label}
      </Label>
      <input
        {...props}
        {...register(name, { valueAsNumber: type === "number" })}
        disabled={isSubmitting || disabled}
        type={type}
        className={input}
        autoComplete="off"
        spellCheck={false}
      />
      <ErrorMessage
        data-error
        errors={errors}
        name={name}
        as="span"
        className={error + "text-red dark:text-red-l2"}
      />
    </div>
  );
}

function format(classes: TextInputProps<any>["classes"]) {
  const {
    container = "",
    input = "",
    error = "",
    label: lbl = "",
  }: Classes = typeof classes === "string"
    ? { container: classes }
    : classes || {};

  return { container, input, error, lbl };
}
