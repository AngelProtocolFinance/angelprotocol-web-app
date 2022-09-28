import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldValues, useFormContext } from "react-hook-form";

export function TextInput<T extends FieldValues>(props: {
  title: string;
  placeholder?: string;
  name: keyof T;

  disabled?: boolean;
  required?: true;
  mono?: true;
  wide?: true;
  plain?: true;
  number?: true;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const id = "__" + String(props.name);
  return (
    <div className="flex flex-col mb-6">
      <label
        className="mb-2 text-xs font-heading uppercase font-bold text-gray-d2"
        htmlFor={id}
      >
        {props.title}
        {props.required && <span className="text-red-l1 ml-1">*</span>}
      </label>

      {React.createElement(props.wide ? "textarea" : "input", {
        ...register(props.name as string, { valueAsNumber: props.number }),
        id: id,
        className: `${
          props.mono ? "font-mono text-sm" : ""
        } text-black disabled:text-gray focus:outline-none ${
          props.plain
            ? "bg-gray-l3 border-b-2 border-gray-d2/25 rounded-none pb-1"
            : "bg-gray-l3 shadow-inner-white rounded-md p-3"
        }`,
        disabled: props.disabled,
        placeholder: props.placeholder,
        autoComplete: "off",
      })}

      <ErrorMessage
        errors={errors}
        name={props.name as string}
        as="span"
        className="font-mono font-semibold text-right text-red-l1 text-xs m-1"
      />
    </div>
  );
}
