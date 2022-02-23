import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { MemberUpdatorValues } from "./memberUpdatorSchema";

export default function TextInput(props: {
  title: string;
  name: keyof MemberUpdatorValues;
  mono?: true;
  wide?: true;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<MemberUpdatorValues>();
  return (
    <div className="flex flex-col mb-4">
      <label className="text-xs font-heading uppercase mb-1 font-bold text-white">
        {props.title}
      </label>

      {React.createElement(props.wide ? "textarea" : "input", {
        ...register(props.name),
        class: `${
          props.mono ? "font-mono" : ""
        } text-white text-opacity-80 focus:outline-none p-3 rounded-md bg-white bg-opacity-10 shadow-inner`,
      })}

      <ErrorMessage
        errors={errors}
        name={props.name}
        as="span"
        className="text-right text-red-200 text-xs mb-1 mt-0.5 mr-1"
      />
    </div>
  );
}
