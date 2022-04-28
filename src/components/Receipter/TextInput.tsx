import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { ReceipterValues as RV } from "@types-component/receipter";

export default function TextInput(props: {
  id: string;
  name: keyof RV;
  label: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RV>();
  return (
    <div className="grid mb-3">
      <label
        htmlFor={props.id}
        className="ml-0.5 text-angel-grey text-xs uppercase font-bold mb-1"
      >
        {props.label}
      </label>
      <input
        {...register(props.name)}
        autoComplete="off"
        id={props.id}
        type="text"
        className="p-3 text-angel-grey rounded-md shadow-inner-white-grey bg-light-grey
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
