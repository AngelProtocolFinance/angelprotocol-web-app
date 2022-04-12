import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext, FieldValues } from "react-hook-form";

export default function TextInput<T extends FieldValues>(props: {
  title: string;
  placeholder?: string;
  name: keyof T;

  disabled?: boolean;
  required?: true;
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
        {props.required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {React.createElement(props.wide ? "textarea" : "input", {
        ...register(props.name as string),
        id: `__${props.name}`,
        className: `${
          props.mono ? "font-mono text-sm" : ""
        } text-black disabled:text-grey-accent focus:outline-none ${
          props.plain
            ? "bg-light-grey border-b-2 border-angel-grey/25 rounded-none pb-1"
            : "bg-light-grey shadow-inner-white-grey rounded-md p-3"
        }`,
        disabled: props.disabled,
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
