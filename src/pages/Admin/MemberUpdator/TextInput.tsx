import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { MemberUpdatorValues } from "./memberUpdatorSchema";

export default function TextInput(props: {
  title: string;
  name: keyof MemberUpdatorValues;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<MemberUpdatorValues>();
  return (
    <div className="flex flex-col text-opacity-80 mb-4">
      <label className="text-angel-grey text-xs font-heading uppercase mb-1">
        {props.title}
      </label>
      <input
        {...register(props.name)}
        type="text"
        className="focus:outline-none p-3 rounded-md shadow-inner-white-grey"
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
