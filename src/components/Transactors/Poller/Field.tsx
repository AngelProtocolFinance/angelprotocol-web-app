import React from "react";
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
      {React.createElement(props.wide ? "textarea" : "input", {
        ...register(props.id),
        id: props.id,
        className:
          "shadow-inner-white-grey bg-light-grey rounded-md p-3 text-angel-grey focus:outline-none",
        disabled: props.frozen,
      })}
      <ErrorMessage
        errors={errors}
        name={props.id}
        as="p"
        className="font-mono font-semibold text-right text-red-400 text-xs m-1"
      />
    </div>
  );
}
