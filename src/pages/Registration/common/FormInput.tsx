import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

export default function FormInput<T extends FieldValues>(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
    fieldName: Path<T>;
    label: string;
    classes?: { error?: string; container?: string };
    mono?: true;
  }
) {
  const {
    label,
    fieldName,
    disabled,
    required,
    classes,
    type = "text",
    mono,
    ...rest
  } = props;

  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<T>();

  return (
    <div
      className={`flex flex-col gap-1 w-full items-start ${
        classes?.container || ""
      }`}
    >
      <label htmlFor={props.fieldName} className="text-dark-grey">
        {label}
        {required && <span className="ml-0.5 text-red">*</span>}
      </label>
      <input
        {...rest}
        id={props.fieldName}
        type={type}
        disabled={disabled || isSubmitting}
        className={`rounded-md outline-none border-none w-full px-3 py-2 text-black bg-white disabled:bg-white/10 ${
          props.mono ? "font-mono" : ""
        }`}
        {...register(props.fieldName)}
      />
      <ErrorMessage
        errors={errors}
        as="p"
        name={props.fieldName as any}
        className={`text-sm text-red ${classes?.error || ""}`}
      />
    </div>
  );
}
