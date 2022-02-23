import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { CreatePollValues } from "./types";

export default function Title(props: {
  id: keyof CreatePollValues;
  label: string;
  wide?: true;
  frozen?: true;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePollValues>();

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
          className="shadow-inner-white-grey bg-white-grey 
          rounded-md p-3 text-angel-grey focus:outline-none"
        />
      )) || (
        <input
          disabled={props.frozen}
          {...register(props.id)}
          autoComplete="off"
          id={props.id}
          type="text"
          className="shadow-inner-white-grey bg-white-grey 
          rounded-md p-3 text-angel-grey focus:outline-none"
        />
      )}
      <ErrorMessage
        errors={errors}
        name={props.id}
        as="p"
        className="text-right mr-0.5 text-red-400 text-xs mb-1 mt-1"
      />
    </div>
  );
}
