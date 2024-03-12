import { Switch } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment, PropsWithChildren } from "react";
import {
  FieldValues as FV,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

type Classes = { container?: string; label?: string; error?: string };

type Props<T extends FV> = PropsWithChildren<{
  name: Path<T>;
  classes?: Classes;
  disabled?: boolean;
  required?: boolean;
}>;

export default function Toggle<T extends FV>({
  name,
  children,
  disabled,
  required,
  classes,
}: Props<T>) {
  const {
    formState: { isSubmitting, errors },
  } = useFormContext<T>();
  const {
    field: { onChange, value },
  } = useController<Record<string, boolean>>({ name });

  const id = `__${name}`;
  const { container = "", label = "", error = "" } = classes || {};

  return (
    <Switch.Group as={Fragment}>
      <div
        className={`grid grid-cols-[auto_1fr] ${
          children ? "gap-x-3" : ""
        } items-center ${container}`}
      >
        <Switch
          disabled={disabled || isSubmitting}
          checked={value}
          onChange={onChange}
          className="border border-gray-l4 peer relative inline-flex h-8 w-14 items-center rounded-full transition-colors"
        >
          <span
            className={`${
              value
                ? "translate-x-[1.625rem] bg-blue-d1"
                : "translate-x-1 bg-gray"
            } inline-block h-6 w-6 transform rounded-full  transition-transform`}
          />
        </Switch>

        <Switch.Label
          data-required={required}
          className={`${label} cursor-pointer peer-disabled:cursor-default data-[required=true]:after:ml-1 data-[required=true]:after:content-['*'] data-[required=true]:after:text-red`}
          htmlFor={id}
        >
          {children}
        </Switch.Label>

        <ErrorMessage
          data-error
          errors={errors}
          name={name as any}
          as="p"
          className={error}
        />
      </div>
    </Switch.Group>
  );
}
