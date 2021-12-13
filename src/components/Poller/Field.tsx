import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Values } from "./types";

type Props = {
  id: keyof Values;
  label: string;
  wide?: true;
  frozen?: true;
};
export default function Title(props: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<Values>();

  return (
    <div className="grid mb-4">
      <label
        htmlFor={props.id}
        className="text-angel-grey text-sm uppercase pl-0.5 mb-2"
      >
        {props.label}
      </label>
      {(props.wide && (
        <textarea
          {...register(props.id)}
          id={props.id}
          className="border-2 rounded-md p-2 text-angel-grey focus:outline-none"
        />
      )) || (
        <input
          disabled={props.frozen}
          {...register(props.id)}
          autoComplete="off"
          id={props.id}
          type="text"
          className="border-2 rounded-md p-2 text-angel-grey focus:outline-none"
        />
      )}
      <ErrorMessage
        errors={errors}
        name={props.id}
        as="span"
        className="text-red-400 text-xs mb-1 mt-0.5"
      />
    </div>
  );
}
