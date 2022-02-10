import { Values } from "./types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type TextInputProps = {
  id: string;
  name: keyof Values;
  errors?: any;
  label?: string;
};

export default function TextInput(props: TextInputProps) {
  const { register } = useFormContext<Values>();
  return (
    <>
      <div className="grid">
        <label
          htmlFor={props.id}
          className="text-angel-grey text-xs uppercase font-bold mb-1"
        >
          {props.label}
        </label>
        <input
          {...register(props.name)}
          autoComplete="off"
          id={props.id}
          type="text"
          className="p-1 pl-0 outline-none border border-dark-grey border-opacity-60 text-black text-md pl-2 rounded-sm"
        />
      </div>
      <ErrorMessage
        errors={props.errors}
        name={props.name}
        as="span"
        className="text-right text-red-400 text-sm mb-1 mt-0.5 mr-1"
      />
    </>
  );
}
