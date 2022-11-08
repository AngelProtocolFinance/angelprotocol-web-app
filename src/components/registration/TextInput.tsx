import { ErrorMessage } from "@hookform/error-message";
import { FieldValues, useFormContext } from "react-hook-form";
import {
  Label,
  TextField,
  TextInputProps,
  errorStyle,
} from "components/TextInput";

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
    <div className={`relative ${classes?.container || ""}`}>
      <Label
        className={classes?.label + " mb-2"}
        required={required}
        htmlFor={id}
      >
        {label}
      </Label>
      <TextField
        {...props}
        registerReturn={register(name)}
        id={id}
        className={classes?.input}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        as="span"
        className={errorStyle}
      />
    </div>
  );
}
