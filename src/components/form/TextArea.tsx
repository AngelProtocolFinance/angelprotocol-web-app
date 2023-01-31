import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FieldValues, Path } from "react-hook-form";
import { Classes } from "./types";
import { Label } from ".";

export type TextAreaProps<T extends FieldValues> = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "type" | "autoComplete" | "className" | "name" | "id"
> & {
  name: Path<T>;
  classes?: Classes;
  label: string;
};

export function TextArea<T extends FieldValues>({
  label,
  name,
  classes,
  required,
  disabled,
  ...props
}: TextAreaProps<T>) {
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
      <textarea
        id={id}
        {...props}
        {...register(name)}
        disabled={isSubmitting || disabled}
        className={classes?.input}
        autoComplete="off"
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
