import Icon, { type IconType } from "components/Icon";
import type { Classes } from "components/form/types";
import { unpack } from "helpers";
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import {
  type FieldValues,
  type Path,
  get,
  useFormContext,
} from "react-hook-form";
import { fieldClasses } from "./constants";

type Props<T extends FieldValues> = {
  classes?: Classes;
  name: Path<T>;
  placeholder: string;
  icon?: IconType;
  autoComplete?: InputHTMLAttributes<HTMLInputTypeAttribute>["autoComplete"];
};

export function Input<T extends FieldValues>(props: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const errorMsg = get(errors, props.name)?.message;

  const { container, input, error } = unpack(props.classes);

  return (
    <div className={container}>
      <div
        className={`grid ${
          props.icon ? "grid-cols-[auto_1fr]" : ""
        } ${fieldClasses}`}
      >
        {props.icon && (
          <Icon type={props.icon} className="ml-5 text-navy-l3" size={20} />
        )}
        <input
          {...register(props.name)}
          type="text"
          className={`w-full h-full placeholder:font-medium placeholder:font-heading placeholder:text-navy-l3 max-sm:placeholder:text-sm focus:outline-none bg-transparent ${
            props.icon ? "pr-5" : "px-5"
          } ${input}`}
          placeholder={props.placeholder}
          aria-invalid={!!errorMsg}
          autoComplete={props.autoComplete}
        />
      </div>
      {errorMsg && (
        <p className={`text-xs text-red-d3 mt-1.5 ${error}`}>{errorMsg}</p>
      )}
    </div>
  );
}
