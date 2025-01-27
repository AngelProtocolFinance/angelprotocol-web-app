import { ErrorMessage } from "@hookform/error-message";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";

export default function DateInput<T extends FieldValues>({
  name,
}: {
  name: Path<T>;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  return (
    <div>
      <input
        {...register(name)}
        type="date"
        className="date-input uppercase text-sm relative w-full px-4 py-3 border border-gray-l4 rounded-md border-collapse dark:bg-blue-d6"
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
