import { Field, Label, Switch } from "@headlessui/react";
import { unpack } from "helpers/unpack";
import type { PropsWithChildren } from "react";

type Classes = { container?: string; label?: string; error?: string };

interface Props extends PropsWithChildren {
  classes?: Classes;
  disabled?: boolean;
  required?: boolean;
  value: boolean;
  onChange: (val: boolean) => void;
  error?: string;
}

export const Toggle = ({ children, ...props }: Props) => {
  const cls = unpack(props.classes);
  return (
    <Field
      className={`grid grid-cols-[auto_1fr] ${
        children ? "gap-x-3" : ""
      } items-center ${cls.container}`}
    >
      <Switch
        disabled={props.disabled}
        checked={props.value}
        onChange={props.onChange}
        className="border border-gray-l3 peer relative inline-flex h-8 w-14 items-center rounded-full transition-colors"
      >
        <span
          className={`${
            props.value
              ? "translate-x-[1.625rem] bg-blue-d1"
              : "translate-x-1 bg-gray"
          } inline-block h-6 w-6 transform rounded-full  transition-transform`}
        />
      </Switch>

      <Label
        data-required={props.required}
        className={`${cls.label} cursor-pointer peer-disabled:cursor-default data-[required=true]:after:ml-1 data-[required=true]:after:content-['*'] data-[required=true]:after:text-red`}
      >
        {children}
      </Label>

      <p data-error className={`${cls.error} empty:hidden`}>
        {props.error}
      </p>
    </Field>
  );
};
