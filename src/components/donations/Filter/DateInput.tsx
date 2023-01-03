import { ErrorMessage } from "@hookform/error-message";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { FilterFormValues } from "../types";

export default function DateInput<T extends FieldValues>({
  name,
  placeholder,
}: {
  name: Path<T>;
  placeholder: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FilterFormValues>();
  return (
    <div>
      <input
        {...register(name as any)}
        type="date"
        className="relative filter-date w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
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
