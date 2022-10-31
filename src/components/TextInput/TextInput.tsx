import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Label } from "./Label";
import { TextField } from "./TextField";
import { errorStyle } from "./constants";

type Classes = {
  input?: string;
  container?: string;
  label?: string;
};

export function TextInput<T extends FieldValues>({
  label,
  name,
  classes,
  required,
  ...props
}: Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "autoComplete" | "className" | "name" | "id"
> & {
  name: Path<T>;
  classes?: Classes;
  label: string;
}) {
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
