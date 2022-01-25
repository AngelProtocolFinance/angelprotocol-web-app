import { Values } from "components/Receipter/types";
import { useFormContext } from "react-hook-form";

type TextInputProps = {
  placeholder: string;
  id: string;
  name: keyof Values;
};

export default function TextInput(props: TextInputProps) {
  const { register } = useFormContext<Values>();
  return (
    <div className="grid">
      <input
        {...register(props.name)}
        autoComplete="off"
        id={props.id}
        type="text"
        placeholder={props.placeholder}
        className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
      />
    </div>
  );
}
