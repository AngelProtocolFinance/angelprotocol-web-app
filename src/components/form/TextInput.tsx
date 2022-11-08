import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FieldValues, Path } from "react-hook-form";
import { Label, TextField } from "./";

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
  base,
  required,
  ...props
}: TextInputProps<T> & { base?: Classes }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const id = "__" + String(name);
  return (
    <div className={`${base?.container ?? ""} ${classes?.container || ""}`}>
      <Label
        className={`${base?.label ?? ""} ${classes?.label ?? ""}`}
        required={required}
        htmlFor={id}
      >
        {label}
      </Label>
      <TextField
        {...props}
        registerReturn={register(name)}
        id={id}
        className={`${base?.input ?? ""} ${classes?.input ?? ""}`}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        as="span"
        className={`${base?.error ?? ""} ${classes?.error ?? ""}`}
      />
    </div>
  );
}
