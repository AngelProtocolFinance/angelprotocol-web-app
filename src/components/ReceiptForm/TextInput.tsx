import { Values } from "components/Receipter/types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type TextInputProps = {
  placeholder: string;
  id: string;
  name: keyof Values;
  errors?: any;
};

export default function TextInput(props: TextInputProps) {
  const { register } = useFormContext<Values>();
  return (
    <>
      <div className="grid">
        <input
          {...register(props.name)}
          autoComplete="off"
          id={props.id}
          type="text"
          placeholder={props.placeholder}
          className="p-1 pl-0 outline-none border border-dark-grey border-opacity-60 text-black text-xl pl-2 rounded-md"
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
