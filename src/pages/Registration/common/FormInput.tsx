import { InputHTMLAttributes } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export function FormInput<T extends FieldValues>(
  props: InputHTMLAttributes<HTMLInputElement> & {
    fieldName: Path<T>;
    label?: string;
  }
) {
  const {
    label,
    fieldName,
    disabled,
    required,
    className = "",
    type = "text",
    ...rest
  } = props;

  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<T>();

  return (
    <div className={`flex flex-col gap-1 w-full items-start ${className}`}>
      {!!label && (
        <label htmlFor={props.fieldName} className="text-dark-grey">
          {label}
          {required && <span className="ml-0.5 text-red">*</span>}
        </label>
      )}
      <input
        {...rest}
        id={props.fieldName}
        type={type}
        disabled={disabled || isSubmitting}
        className="rounded-md outline-none border-none w-full px-3 py-2 text-black bg-white disabled:bg-white/10"
        {...register(props.fieldName)}
      />
      <ErrorMessage<T> name={props.fieldName} />
    </div>
  );
}
