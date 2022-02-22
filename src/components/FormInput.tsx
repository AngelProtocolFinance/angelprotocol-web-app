import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorMessage?: string;
  registerReturn?: UseFormRegisterReturn;
  errorClassName?: string;
};

export default function FormInput(props: Props) {
  const {
    label,
    errorMessage,
    registerReturn,
    required,
    className,
    errorClassName,
    type = "text",
    ...rest
  } = props;
  const id = registerReturn?.name || rest.id;

  return (
    <div className={`flex flex-col gap-1 w-full items-start ${className}`}>
      <label htmlFor={id} className="text-dark-grey">
        {label}
        {required && <span className="ml-0.5 text-failed-red">*</span>}
      </label>
      <input
        id={id}
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
