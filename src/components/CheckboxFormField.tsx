import { ErrorMessage } from "@hookform/error-message";
import { PropsWithChildren } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type Classes = {
  container?: string;
  checkbox?: string;
  label?: string;
  error?: string;
};

export default function CheckboxFormField<T extends FieldValues>({
  name,
  children,
  classes,
  disabled,
  required,
}: PropsWithChildren<{
  name: Path<T>;
  classes?: Classes;
  disabled?: true;
  required?: boolean;
}>) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<T>();

  const id = `__${name}` as Path<T>;

  return (
    <div
      className={`${
        classes?.container ?? ""
      } grid grid-cols-[auto_1fr] gap-x-3 relative items-center`}
    >
      <input
        className={
          classes?.checkbox + " peer cursor-pointer disabled:cursor-default"
        }
        type="checkbox"
        {...register(name)}
        id={id}
        disabled={isSubmitting || disabled}
      />
      <label
        className={`${classes?.label ?? ""} ${
          required ? "after:ml-1 after:content-['*'] after:text-red" : ""
        } cursor-pointer peer-disabled:cursor-default`}
        htmlFor={id}
      >
        {children}
      </label>

      <ErrorMessage
        errors={errors}
        name={name as any}
        as="p"
        className={`col-span-full text-xs text-red dark:text-red-l2 ${
          classes?.error ?? ""
        }`}
      />
    </div>
  );
}
