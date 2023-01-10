import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { FilterFormValues } from "../../../components/donations/types";

export default function DateInput<T extends FieldValues>({
  name,
  placeholder,
  onChange,
}: {
  name: Path<T>;
  placeholder: string;
  onChange?: () => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FilterFormValues>();
  return (
    <div>
      <input
        {...register(name as any, { onChange })}
        type="date"
        className="relative w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-md border-collapse dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
        placeholder={placeholder}
      />
      <ErrorMessage
        errors={errors}
        as="span"
        name={name as any}
        className="w-full text-xs text-red-l4 dark:text-red-l2"
      />
    </div>
  );
}
