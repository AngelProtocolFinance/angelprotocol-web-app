import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "@types-component/withdrawer";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  field: keyof WithdrawValues;
};

export default function InputField(props: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<WithdrawValues>();

  return (
    <div className="grid my-2 p-3 pb-1 rounded-md bg-light-grey shadow-inner-white-grey">
      <label
        htmlFor={props.field}
        className="text-angel-grey font-bold font-heading text-sm uppercase mb-2"
      >
        {props.label}
      </label>
      <input
        {...register(props.field)}
        id={props.field}
        type="text"
        placeholder={props.placeholder}
        autoComplete="off"
        className="p-1 pl-0 w-full bg-light-grey outline-none text-angel-grey font-mono text-sm"
      />
      <ErrorMessage
        errors={errors}
        name={props.field}
        as="span"
        className="font-mono font-semibold text-right text-red-400 text-xs m-1"
      />
    </div>
  );
}
