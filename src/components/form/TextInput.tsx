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
  classes?: Classes;
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

  const id = "__" + String(name);

  return (
    <div className={classes?.container}>
      <Label className={classes?.label} required={required} htmlFor={id}>
        {label}
      </Label>
      <input
        {...props}
        {...register(name, { valueAsNumber: type === "number" })}
        disabled={isSubmitting || disabled}
        type={type}
        className={classes?.input}
        autoComplete="off"
        spellCheck={false}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        as="span"
        className={classes?.error}
      />
    </div>
  );
}
