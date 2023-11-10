import { ErrorMessage } from "@hookform/error-message";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { FormValues } from "./types";

export default function DateInput<T extends FieldValues>({
  name,
}: {
  name: Path<T>;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  return (
    <div>
      <input
        {...register(name as any)}
        type="date"
        className="date-input uppercase text-sm relative w-full px-4 py-3 border border-prim rounded-md border-collapse dark:bg-blue-d3"
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
