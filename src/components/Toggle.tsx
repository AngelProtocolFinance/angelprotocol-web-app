import { Field, Label, Switch } from "@headlessui/react";
import { unpack } from "helpers";
import type { PropsWithChildren } from "react";
import {
  type FieldValues as FV,
  type Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";

type Classes = { container?: string; label?: string; error?: string };

interface BaseProps extends PropsWithChildren {
  classes?: Classes;
  disabled?: boolean;
  required?: boolean;
}

interface Props<T extends FV> extends BaseProps {
  name: Path<T>;
}

interface ControlledProps extends BaseProps {
  value: boolean;
  onChange: (val: boolean) => void;
  error?: string;
}

export const ControlledToggle = ({ children, ...props }: ControlledProps) => {
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
        className="border border-gray-l4 peer relative inline-flex h-8 w-14 items-center rounded-full transition-colors"
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

      <p data-error className={cls.error + " empty:hidden"}>
        {props.error}
      </p>
    </Field>
  );
};

export default function Toggle<T extends FV>({
  name,
  disabled,
  ...props
}: Props<T>) {
  const {
    formState: { isSubmitting, errors },
  } = useFormContext<T>();
  const {
    field: { onChange, value },
  } = useController<Record<string, boolean>>({ name });

  return (
    <ControlledToggle
      value={value}
      onChange={onChange}
      disabled={disabled || isSubmitting}
      {...props}
      error={get(errors, name)?.message}
    />
  );
}
