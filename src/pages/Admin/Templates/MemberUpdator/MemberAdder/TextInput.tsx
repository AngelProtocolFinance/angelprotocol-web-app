import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { Values } from "./MemberAdder";

export default function TextInput(props: {
  title: string;
  name: keyof Values;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<Values>();
  return (
    <div className="flex flex-col text-white text-opacity-80 mb-4">
      <label className="text-xs font-heading uppercase mb-1">
        {props.title}
      </label>
      <input
        {...register(props.name)}
        type="text"
        className="bg-transparent focus:outline-none p-3 bg-white bg-opacity-10 shadow-inner rounded-md"
      />
      <ErrorMessage
        errors={errors}
        name={props.name}
        as="span"
        className="text-right text-red-200 text-xs mb-1 mt-0.5 mr-1"
      />
    </div>
  );
}
