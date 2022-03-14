import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";

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
      <div className="flex flex-row justify-between">
        <label
          htmlFor={props.field}
          className="text-angel-grey font-bold font-heading text-sm uppercase"
        >
          {props.label}
        </label>
      </div>
      <div className="flex justify-between items-center gap-2 outline-none mt-2">
        <input
          {...register(props.field)}
          id={props.field}
          type="text"
          placeholder={props.placeholder}
          autoComplete="off"
          className="p-1 pl-0 w-full bg-light-grey outline-none text-angel-grey text-xl"
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={props.field}
        as="span"
        className="text-right text-red-400 text-xs mb-1 mr-1"
      />
    </div>
  );
}
