import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorMessage?: string;
  registerReturn?: UseFormRegisterReturn;
  errorClassName?: string;
};

export default function Input(props: Props) {
  const {
    label,
    errorMessage,
    registerReturn,
    required,
    className,
    errorClassName,
    ...rest
  } = props;
  const { type = "text" } = rest;

  return (
    <div className={`flex flex-col gap-1 w-full items-start ${className}`}>
      <label
        htmlFor={registerReturn?.name || rest.id}
        className="text-dark-grey"
      >
        {label}
        {required && <span className="ml-0.5 text-failed-red">*</span>}
      </label>
      <input
        id={registerReturn?.name || rest.id}
        type={type}
        className="rounded-md outline-none border-none w-full px-3 py-2 text-black"
        {...registerReturn}
        {...rest}
      />
      {errorMessage && (
        <p className={`text-sm text-failed-red ${errorClassName}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
