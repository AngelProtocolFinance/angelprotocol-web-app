import { Values } from "./types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type TextInputProps = {
  id: string;
  name: keyof Values;
  label: string;
};

export default function TextInput(props: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<Values>();
  return (
    <div className="grid mb-2">
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
        className="p-3 text-angel-grey bg-grey-accent bg-opacity-10 shadow-inner rounded-md border focus:outline-none focus:ring-1"
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
