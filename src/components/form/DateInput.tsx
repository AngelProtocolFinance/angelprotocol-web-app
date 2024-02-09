import { forwardRef } from "react";
import {
  FieldValues,
  Path,
  UseFormRegisterReturn,
  get,
  useFormContext,
} from "react-hook-form";

function _Date(
  { error, ...props }: UseFormRegisterReturn & { error?: string },
  ref: any
) {
  return (
    <div>
      <input
        {...props}
        ref={ref}
        type="date"
        className="date-input uppercase text-sm relative w-full px-4 py-3 border border-prim rounded-md border-collapse dark:bg-blue-d6"
      />

      {error && (
        <span className="w-full text-xs text-red-l4 dark:text-red-l2">
          {error}
        </span>
      )}
    </div>
  );
}

export const NativeDateInput = forwardRef(_Date) as typeof _Date;

export default function DateInput<T extends FieldValues>({
  name,
}: {
  name: Path<T>;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  return <NativeDateInput {...register(name)} error={get(errors, name)} />;
}
