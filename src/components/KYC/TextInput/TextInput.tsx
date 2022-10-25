import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import Label from "../Label";
import { TextField } from "./TextField";

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
  "type" | "autoComplete" | "className" | "name"
> & {
  name: Path<T>;
  classes?: Classes;
  label: string;
  required?: true;
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
        className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l4"
      />
    </div>
  );
}
