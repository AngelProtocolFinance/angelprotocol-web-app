import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

export default function TextInput<T extends object>(props: {
  title: string;
  placeholder: string;
  name: keyof T;
  mono?: true;
  wide?: true;
  plain?: true;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col mb-6">
      <label
        className="mb-2 text-xs font-heading uppercase font-bold text-angel-grey"
        htmlFor={`__${props.name}`}
      >
        {props.title}
      </label>

      {React.createElement(props.wide ? "textarea" : "input", {
        ...register(props.name as string),
        id: `__${props.name}`,
        className: `${
          props.mono ? "font-mono" : ""
        } text-angel-grey focus:outline-none placeholder:text-grey-accent ${
          props.plain
            ? "bg-light-grey border-b-2 border-opacity-30 border-angel-grey rounded-none pb-1"
            : "bg-light-grey shadow-inner-white-grey rounded-md p-3"
        }`,
        placeholder: props.placeholder,
        autoComplete: "off",
      })}

      <ErrorMessage
        errors={errors}
        name={props.name as string}
        as="span"
        className="font-mono font-semibold text-right text-red-400 text-xs m-1"
      />
    </div>
  );
}
