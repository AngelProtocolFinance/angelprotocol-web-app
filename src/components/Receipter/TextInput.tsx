import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { ReceipterValues as RV } from "./types";

export default function TextInput(props: {
  id: string;
  name: keyof RV;
  label: string;
  required?: true;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RV>();
  return (
    <div className="grid mb-3">
      <label
        htmlFor={props.id}
        className="ml-0.5 text-gray-d2 text-xs uppercase font-bold mb-1"
      >
        {props.label}
        {props.required && <span className="text-rose-400"> *</span>}
      </label>
      <input
        {...register(props.name)}
        autoComplete="off"
        id={props.id}
        type="text"
        className="p-3 text-gray-d2 rounded-md shadow-inner-white bg-gray-l2
         focus:outline-none"
      />
      <ErrorMessage
        errors={errors}
        name={props.name}
        as="span"
        className="text-right text-red-400 text-xs mt-1 mr-1"
      />
    </div>
  );
}
