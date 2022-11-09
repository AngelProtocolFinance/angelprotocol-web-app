import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FieldValues, Path } from "react-hook-form";
import { Label } from "./";

export type TextInputProps<T extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "autoComplete" | "className" | "name" | "id"
> & {
  name: Path<T>;
  classes?: Classes;
  label: string;
};

type Classes = {
  input?: string;
  container?: string;
  label?: string;
  error?: string;
};

export function TextInput<T extends FieldValues>({
  label,
  name,
  classes,
  required,
  ...props
}: TextInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const id = "__" + String(name);
  return (
    <div className={classes?.container}>
      <Label className={classes?.label} required={required} htmlFor={id}>
        {label}
      </Label>
      <input
        {...props}
        {...register(name)}
        type="text"
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
