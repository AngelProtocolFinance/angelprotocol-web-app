import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { TextInput as BaseInput, TextInputProps } from "components/form";

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
            ? "bg-gray-l4 border-b-2 border-gray-d2/25 rounded-none pb-1"
            : "bg-gray-l4 shadow-inner-white rounded-md p-3"
        }`,
        disabled: props.disabled,
        placeholder: props.placeholder,
        autoComplete: "off",
      })}

      <ErrorMessage
        errors={errors}
        name={props.name as string}
        as="span"
        className="text-right text-red text-xs m-1"
      />
    </div>
  );
}

const errorStyle =
  "absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2";

export function TextPrim<T extends FieldValues>({
  classes,
  ...props
}: TextInputProps<T>) {
  const { container = "", label = "", input = "", error = "" } = classes || {};
  return (
    <BaseInput
      {...props}
      classes={{
        container: `relative ${container}`,
        label: `mb-2 ${label}`,
        input: `w-full text-sm rounded placeholder:text-gray-d1 dark:placeholder:text-gray border px-4 py-3.5 border-gray-l2 focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 dark:border-bluegray bg-orange-l6 dark:bg-blue-d7 disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1 ${input}`,
        error: `${errorStyle} ${error}`,
      }}
    />
  );
}

export function TextSec<T extends FieldValues>({
  classes,
  ...props
}: TextInputProps<T>) {
  const { container = "", label = "", input = "", error = "" } = classes || {};
  return (
    <BaseInput
      {...props}
      classes={{
        container: `relative ${container}`,
        label: `mb-2 ${label}`,
        input: `w-full text-sm placeholder:text-gray-d1 dark:placeholder:text-gray border-b pb-2 border-gray-l2 focus:outline-none focus:border-gray-d1 focus:dark:border-blue-l2 dark:border-bluegray bg-transparent disabled:bg-gray-l4 disabled:text-gray-d1 disabled:dark:text-gray disabled:dark:bg-bluegray-d1 ${input}`,
        error: `${errorStyle} ${error}`,
      }}
    />
  );
}
